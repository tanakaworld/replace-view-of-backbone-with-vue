<template>
    <form class="GlobalForm">
        <slot/>
    </form>
</template>

<script>
    export default {
        name: "GlobalForm"
    };
</script>

<style scoped>
    .GlobalForm {
        display: flex;
        flex-direction: column;
    }
</style>
