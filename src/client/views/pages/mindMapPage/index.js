import Backbone from 'backbone';
import template from './template.hbs';

export default Backbone.View.extend({
    template,

    render() {
        this.$el.html(this.template({title: 'MindMap'}));
    }
});
