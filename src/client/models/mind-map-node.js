import joint from "jointjs";
import _ from 'lodash';

const DEFAULT_FILL_COLOR = '#FFFFFF';
const DEFAULT_STROKE_COLOR = '#000000';
const DEFAULT_STROKE_WIDTH = '1';
const SELECTED_STROKE_COLOR = '#3563ff';
const SELECTED_STROKE_WIDTH = '5';

export default joint.shapes.devs.Model.extend({
    urlRoot() {
        return `/api/mindMaps/${this.mindMapId}/mindMapNodes`;
    },

    defaults: _.defaultsDeep(joint.shapes.devs.Model.prototype.defaults, {
        position: {x: 100, y: 100},
        inPorts: ['in'],
        outPorts: ['out'],

        title: 'NodeTitle',
        color: DEFAULT_FILL_COLOR
    }),

    initialize({mindMapId, title, color}) {
        joint.shapes.devs.Model.prototype.initialize.apply(this, arguments);

        if (!mindMapId) throw new Error('`mindMapId` is needed');
        this.mindMapId = mindMapId;

        this.updateUI({
            title: title || this.get('title'),
            color: color || this.get('color')
        });
    },

    updateData({title, color}) {
        this.save({title, color})
            .then(() => {
                this.updateUI({title, color});
            })
            .catch((e) => {
                console.error(e);
                alert('Error!');
            });
    },

    updateUI({title, color}) {
        this.attr('.label/text', title);
        this.attr('.body/fill', color);
    },

    focus(flag = true) {
        this.attr('.body/stroke', flag ? SELECTED_STROKE_COLOR : DEFAULT_STROKE_COLOR);
        this.attr('.body/strokeWidth', flag ? SELECTED_STROKE_WIDTH : DEFAULT_STROKE_WIDTH);
    }
});
