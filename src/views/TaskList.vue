<template>
    <div class="tasks">
        <h1>Tasks page for project {{projectId}}</h1>
        <p v-if="tasks.length == 0">There are no tasks yet for this project</p>
        <Task v-else v-for="task in tasks" :key="task.id" :task="task"></Task>
        <addTask :projectId="projectId"></addTask>
    </div>
</template>

<script>
import Task from "@/components/Task.vue";
import addTask from "@/components/addTask.vue";
import ApiInteractions from "../services/ApiInteractions";


export default {
    name: "Tasks",
    props: ['projectId'],
    components: {
        Task,
        addTask
    },
    data() {
        return {
            tasks: []
        }
    },
    created() {
        ApiInteractions
            .getTasksInProject(this.projectId)
            .then(response => {
                this.tasks = response.data.tasks
            })
            .catch(error => {
                console.log('Error fetching projects: ' + error.response)
            })
    }
}
</script>

<style scoped>

</style>