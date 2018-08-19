import Backbone from 'backbone';
import $ from 'jquery';
import joint from 'jointjs';

import template from './template.hbs';
import NodeEditor from './nodeEditor';

import MindMapNodesCollection from '../../collections/mindMapNodes';
import MindMapLinksCollection from '../../collections/mindMapLinks';
import MindMapGraph from '../../models/mindMapGraph';
import MindMapLink from '../../models/mindMapLink';
import MindMapNode from '../../models/mindMapNode';

export default Backbone.View.extend({
    template,

    id: 'MindMapPage',

    events: {
        'drop .MindMap__Paper': 'drop',
        "dragover .MindMap__Paper": "allowDrop"
    },

    initialize({mindMapModel}) {
        this.mindMapModel = mindMapModel;
        this.mindMapId = this.mindMapModel.get('id');
    },

    render() {
        this.$el.html(this.template({
            id: this.mindMapModel.get('id'),
            title: this.mindMapModel.get('title')
        }));
        setTimeout(() => {
            this.initializeNodeEditor();
            this.renderGraph();
        }, 100);
    },

    renderGraph() {
        const {mindMapId} = this;

        this.graph = new MindMapGraph();
        this.graph.on('add', (cell) => {
            if (cell instanceof MindMapLink) {
                cell.on('change:target change:source', () => {
                        const s = cell.get('source');
                        const t = cell.get('target');
                        if (s.id && t.id) {
                            if (s.port) cell.set('from', s.id);
                            if (t.port) cell.set('to', t.id);
                            cell.save(null, {
                                error: () => alert('Failed to save link ...')
                            });
                        }
                    }
                );
            }
        }).on('remove', (cell) => {
            if (cell instanceof MindMapLink) {
                cell.destroy();
            }
        });

        this.paper = new joint.dia.Paper({
            el: $('.MindMap__Paper'),
            width: 800,
            height: 900,
            gridSize: 1,
            model: this.graph,
            defaultLink: () => {
                return new MindMapLink({mindMapId});
            },
            linkPinning: false,
            snapLinks: {radius: 75},
            markAvailable: true,
            validateMagnet: (cellView, magnet) => !(magnet && magnet.getAttribute('port') === 'in'),
            validateConnection: (cellFrom, magnetFrom, cellTo, magnetTo) => {
                if (cellFrom === cellTo) return false;

                // able to connect 'out' -> 'in'
                const fromPort = magnetFrom.getAttribute('port');
                const toPort = magnetTo.getAttribute('port');
                return fromPort === 'out' && toPort === 'in';
            }
        }).on('element:pointerup', (cellView) => {
            const model = cellView.model;

            if (model instanceof MindMapNode) {
                this.renderNodeEditor(model);
                // save current position
                model.save(null, {
                    error: () => alert('Failed to save position changed ...')
                });
            }
        }, this).on('blank:pointerup', () => {
            this.destroyNodeEditor();
        }, this);

        // initial data
        const mindMapNodesCollection = new MindMapNodesCollection({mindMapId});
        const mindMapLinksCollection = new MindMapLinksCollection({mindMapId});
        $.when(mindMapNodesCollection.fetch(), mindMapLinksCollection.fetch()).then(() => {
            // MindMapNodes
            mindMapNodesCollection.models.forEach((model) => {
                this.graph.makeNode(model.toJSON());
            });
            // MindMapLinks
            mindMapLinksCollection.models.forEach((model) => {
                const {id, from: sourceId, to: targetId} = model.toJSON();
                this.graph.makeLink({
                    mindMapId: this.mindMapId,
                    id, sourceId, targetId
                });
            });
        }).catch(() => {
            alert('Failed to load initial data ...');
        });
    },

    drop(e) {
        e.preventDefault();
        const {x, y} = this.getSVGLocation(e);
        const {mindMapId} = this;

        // render new node
        const node = this.graph.makeNode({mindMapId, x, y});
        this.renderNodeEditor(node);

        // async to save
        node.save().catch((e) => {
            console.error(e);
            this.graph.deleteNodes(node);
            alert('Error');
        });
    },

    allowDrop(e) {
        e.preventDefault();
    },

    getSVGLocation(e) {
        const $svg = $('svg');
        const svgPt = $svg[0].createSVGPoint();
        svgPt.x = e.clientX;
        svgPt.y = e.clientY;
        const viewport = $svg.children()[0];
        return svgPt.matrixTransform(viewport.getScreenCTM().inverse());
    },

    initializeNodeEditor() {
        this.nodeEditor = new NodeEditor({
            el: '.MindMap__NodeEditor',
            deleteNodeCallback: (model) => {
                model.destroy({
                    success: () => {
                        this.destroyNodeEditor();
                    },
                    error: (e) => {
                        console.error(e);
                        alert('Error');
                    }
                });
            }
        });
    },

    renderNodeEditor(model) {
        this.destroyNodeEditor();

        model.focus(true);

        this.nodeEditor.render(model);
        this.modelInNodeEditor = model;
    },

    destroyNodeEditor() {
        if (this.nodeEditor) {
            this.nodeEditor.close();
        }
        if (this.modelInNodeEditor) {
            this.modelInNodeEditor.focus(false);
            this.modelInNodeEditor = null;
        }
    }
});
