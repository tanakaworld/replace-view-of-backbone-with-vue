import Backbone from 'backbone';
import $ from 'jquery';
import joint from 'jointjs';

import template from './template.hbs';
import NodeEditor from './node-editor';

import MindMapNodesCollection from '../../collections/mind-map-nodes';
import MindMapLinksCollection from '../../collections/mind-map-links';
import MindMapGraph from '../../models/mind-map-graph';
import MindMapLink from '../../models/mind-map-link';
import MindMapNode from '../../models/mind-map-node';

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

    renderNodeEditor(model) {
        this.destroyNodeEditor();

        model.focus(true);
        this.nodeEditor = new NodeEditor({
            el: '.MindMap__NodeEditor',
            model,
            deleteNodeCallback: () => {
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
        this.nodeEditor.render();
        this.modelInNodeEditor = model;
    },

    destroyNodeEditor() {
        if (this.nodeEditor) {
            this.nodeEditor.close();
            this.nodeEditor.$el.empty();
            this.nodeEditor = null;
        }
        if (this.modelInNodeEditor) {
            this.modelInNodeEditor.focus(false);
            this.modelInNodeEditor = null;
        }
    }
});
