<template>
    <div class="NodeEditor">
        <form class="NodeEditor__Form Form">
            <div class="FormGroup">
                <label class="FormLabel">ID</label>
                <small>{{id}}</small>
            </div>

            <div class="FormGroup">
                <label class="FormLabel">Title</label>
                <input name="title" class="NodeEditor__Title" type="text" v-model="tmpTitle" @blur="onBlurTitle"/>
            </div>

            <div class="FormGroup">
                <label class="FormLabel">Color</label>
                <color-picker class="NodeEditor__ColorPicker" v-model="tmpColor"/>
            </div>
        </form>

        <button class="NodeEditor__DeleteBtn" @click="onClickDelete">Delete</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {ACTIONS} from './store';
    import {Sketch as ColorPicker} from 'vue-color';

    export default {
        name: "NodeEditor",
        components: {
            ColorPicker
        },
        props: {
            id: {
                type: String,
                default: null
            },
            title: {
                type: String
            },
            color: {
                type: String
            }
        },
        data() {
            return {
                tmpTitle: this.title,
                tmpColor: this.color
            };
        },
        methods: {
            ...mapActions([
                ACTIONS.SAVE_MODEL,
                ACTIONS.DELETE_MODEL
            ]),
            onBlurTitle() {
                this.SAVE_MODEL({
                    title: this.tmpTitle,
                    color: this.tmpColor
                });
            },
            onClickDelete() {
                this.DELETE_MODEL();
            }
        },
        watch: {
            tmpColor({hex}) {
                this.SAVE_MODEL({
                    title: this.tmpTitle,
                    color: hex
                });
            }
        }
    };
</script>

<style scoped>

</style>
