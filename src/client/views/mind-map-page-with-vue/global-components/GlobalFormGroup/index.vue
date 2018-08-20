<template>
    <div class="GlobalFormGroup">
        <label class="GlobalFormLabel" v-if="label">{{label}}</label>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "GlobalFormGroup",
        props: {
            label: {
                type: String
            }
        }
    };
</script>

<style scoped>
    .GlobalFormGroup {
        display: flex;
        flex-direction: column;
        margin-top: 8px
    }

    .GlobalFormLabel {
        padding: 0;
        margin: 0;
    }
</style>
