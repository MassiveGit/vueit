<template>
    <div id="task-doing-button">
        <button
            @click.stop="doingTask"
        >Doing</button>
    </div>

</template>

<script>
    export default {
        name: "doingTaskButton",
        methods: {
            doingTask() {
             this.$emit('doing-task')
            }
        }
    }
</script>

<style scoped>
button {
    margin: 5px;
}
</style>