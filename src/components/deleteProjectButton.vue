<template>
    <div id="project-delete-button">
        <button
            @click.stop="deleteProject"
        >Delete</button>
    </div>

</template>

<script>
    export default {
        name: "deleteProjectButton",
        methods: {
            deleteProject() {
             this.$emit('delete-project')
            }
        }
    }
</script>

<style scoped>
button {
    margin: 5px;
}
</style>