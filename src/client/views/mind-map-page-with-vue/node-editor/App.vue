<template>
    <div class="NodeEditor">
        <GlobalForm>
            <GlobalFormGroup label="ID">
                <small>{{id}}</small>
            </GlobalFormGroup>

            <GlobalFormGroup label="Title">
                <input name="title" class="NodeEditor__Title" type="text" v-model="tmpTitle" @blur="onBlurTitle"/>
            </GlobalFormGroup>

            <GlobalFormGroup label="Color">
                <color-picker class="NodeEditor__ColorPicker" v-model="tmpColor"/>
            </GlobalFormGroup>
        </GlobalForm>

        <GlobalButton @click="onClickDelete" type="danger">Delete</GlobalButton>
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
                this.tmpColor = hex;
                this.SAVE_MODEL({
                    title: this.tmpTitle,
                    color: hex
                });
            }
        }
    };
</script>
