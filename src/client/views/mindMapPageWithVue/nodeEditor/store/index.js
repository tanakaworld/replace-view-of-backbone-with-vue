import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const GETTERS = {
    getModel: 'getModel'
};
export const MUTATIONS = {
    setModel: 'setModel',
    clearModel: 'clearModel'
};
export const ACTIONS = {
    SAVE_MODEL: 'SAVE_MODEL',
    DELETE_MODEL: 'DELETE_MODEL'
};

export default new Vuex.Store({
    state: {
        model: null
    },
    getters: {
        [GETTERS.getModel]: state => state.model
    },
    mutations: {
        [MUTATIONS.setModel](state, {model}) {
            state.model = model;
        },
        [MUTATIONS.clearModel](state) {
            state.model = null;
        }
    },
    actions: {
        [ACTIONS.SAVE_MODEL]: ({commit, dispatch, state}, {title, color}) => {
            state.model.updateData({title, color});
        },
        [ACTIONS.DELETE_MODEL]: ({commit, dispatch, state}) => {
            state.model.destroy({
                success: () => {
                    commit(MUTATIONS.clearModel);
                },
                error: () => {
                    alert('Failed to save ...');
                }
            });
        }
    }
});
