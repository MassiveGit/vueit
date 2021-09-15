<template>
    <div id="task-delete-button">
        <button
            @click="deleteTask"
        >Delete</button>
    </div>

</template>

<script>
    export default {
        name: "deleteTaskButton",
        methods: {
            deleteTask() {
             this.$emit('delete-task')
            }
        }
    }
</script>

<style scoped>

</style>