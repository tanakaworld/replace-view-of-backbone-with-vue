<template>
    <button class="GlobalButton"
            @click="onClick"
            :disabled="disabled"
            :class="{'-danger': type === 'danger'}">
        <slot/>
    </button>
</template>

<script>
    export default {
        name: "GlobalButton",
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'normal',
                validator(type) {
                    return ['normal', 'danger'].indexOf(type) !== -1;
                }
            }
        },
        methods: {
            onClick() {
                this.$emit('click');
            }
        }
    };
</script>

<style scoped>
    .GlobalButton {
        cursor: pointer;
        padding: 8px;
    }

    .GlobalButton.-danger {
        color: #f4f4f4;
        background-color: #ce3f42
    }
</style>
