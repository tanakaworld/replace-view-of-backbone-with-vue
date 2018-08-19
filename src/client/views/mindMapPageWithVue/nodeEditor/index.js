import Vue from 'vue';
import App from './App.vue';
import store, {GETTERS, MUTATIONS} from './store';
import {mapGetters} from 'vuex';

export default class NodeEditor {
    constructor({el}) {
        this.vm = new Vue({
            el,
            store,
            data: {
                show: false
            },
            components: {
                App
            },
            methods: {
                ...mapGetters([
                    GETTERS.getModel
                ]),
                // Force to update children.
                // https://github.com/vuejs/Discussion/issues/356#issuecomment-312529480
                //
                // Even if use `vm.$forceUpdate`, all child components won't be deeply re-rendered.
                // https://vuejs.org/v2/api/#vm-forceUpdate
                showEditor() {
                    this.show = false;
                    this.$nextTick(() => {
                        this.show = true;
                    });
                },
                hideEditor() {
                    this.show = false;
                }
            },
            template: `<div v-if="show">` +
                `<App
                    :id="getModel().get('id')"
                    :title="getModel().get('title')"
                    :color="getModel().get('color')"
                />` +
                `</div>`
        });
    }

    render(model) {
        store.commit(MUTATIONS.setModel, {model});
        this.vm.showEditor();
    }

    close() {
        store.commit(MUTATIONS.clearModel);
        this.vm.hideEditor();
    }
}
