import Backbone from 'backbone';
import $ from 'jquery';
import joint from 'jointjs';

import template from './template.hbs';
import NodeEditor from './nodeEditor';
import MindMapGraph from '../../models/mindMapGraph';
import MindMapLink from '../../models/mindMapLink';
import MindMapNode from '../../models/mindMapNode';

export default Backbone.View.extend({
    template,

    events: {
        'drop .MindMap__Paper': 'drop',
        "dragover .MindMap__Paper": "allowDrop"
    },

    render() {
        this.$el.html(this.template({title: 'MindMap'}));
        setTimeout(() => {
            this.renderGraph();
        }, 100);
    },

    renderGraph() {
        this.graph = new MindMapGraph();
        this.paper = new joint.dia.Paper({
            el: $('.MindMap__Paper'),
            width: 800,
            height: 900,
            gridSize: 1,
            model: this.graph,
            defaultLink: new MindMapLink,
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
            }
        }, this).on('blank:pointerup', () => {
            this.destroyNodeEditor();
        }, this);

        // initial data
        const e1 = this.graph.makeNode({x: 100, y: 100});
        const e2 = this.graph.makeNode({x: 300, y: 100});
        this.graph.makeLink({sourceId: e1.get('id'), targetId: e2.get('id')});
    },

    drop(e) {
        e.preventDefault();
        const {x, y} = this.getSVGLocation(e);

        // render new node
        const node = this.graph.makeNode({x, y});
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
            el: $('.MindMap__NodeEditor'),
            model,
            deleteNodeCallback() {
                model.destroy().then(() => {
                    this.destroyNodeEditor();
                }).catch((e) => {
                    console.error(e);
                    alert('Error');
                });
            }
        });
        this.nodeEditor.render();
        this.modelInNodeEditor = model;
    },

    destroyNodeEditor() {
        if (this.nodeEditor) {
            this.nodeEditor.close();
        }
        if (this.modelInNodeEditor) {
            this.modelInNodeEditor.focus(false);
        }
    }
});
