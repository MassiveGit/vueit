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
              if(confirm("Deleting a project is currently irreversible, As I have discovered to my chagrin. Continue?")){
                this.$emit('delete-task');
                }

            }
        }
    }
</script>

<style scoped>
button {
    margin: 5px;
}
</style>