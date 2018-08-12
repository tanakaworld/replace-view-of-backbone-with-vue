import joint from 'jointjs';
import _ from 'lodash';

export default joint.dia.Link.extend({
    defaults: _.defaultsDeep(joint.dia.Link.prototype.defaults, {
        router: {name: 'manhattan'}
    })
});
