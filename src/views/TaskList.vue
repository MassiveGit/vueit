<template>
    <div class="tasks">
        <h1>Tasks page for project {{projectId}}</h1>

        <div class="row">
            <p v-if="tasks.length == 0">There are no tasks yet for this project</p>
            <div class="task-column" id="todo-tasks">
                <h3>TODO:</h3>
                <draggable v-model="incompleteTasks" :component-data="getComponentData()">
                    <Task @delete-task="removeTaskFromList(index)" v-for="(task, index) in incompleteTasks" :key="task.id" :task="task"></Task>
                </draggable>

                <addTask @task-added="updateTasks" :projectId="projectId"></addTask>
            </div>
            <div class="task-column" id="done-tasks">
                <h3>DONE:</h3>
                <draggable v-model="completeTasks">
                    <Task @delete-task="removeTaskFromList(index)" v-for="(task, index) in completeTasks" :key="task.id" :task="task"></Task>
                </draggable>
            </div>
        </div>

    </div>
</template>

<script>
import Task from "@/components/Task.vue";
import addTask from "@/components/addTask.vue";
import ApiInteractions from "../services/ApiInteractions";
import draggable from "vuedraggable";


export default {
    title: "Vueit - Projects",
    name: "Tasks",
    props: ['projectId'],
    components: {
        Task,
        addTask,
        draggable,
    },
    data() {
        return {
            tasks: []
        }
    },
    computed: {
        incompleteTasks() {
            return this.tasks.filter(function (task) {
                return task.status.indexOf('NEW')!== -1
            })
        },

        completeTasks() {
            return this.tasks.filter(function (task) {
                return task.status.indexOf('DONE')!== -1
            })
        }

    },
    methods: {
        removeTaskFromList(index){
            this.tasks.splice(index, 1);
        },
        updateTasks(newTask){
            console.log("tasklist thinks newtask is", newTask);
            this.tasks.push(newTask);
            //this.tasks.push.apply(this.tasks, newTask);
            console.log(this.tasks)
        },
        handleTaskChange() {
            console.log('task state updated');
        },
        inputTaskChanged(value) {
            console.log(value);
        },
        getComponentData() {
            return {
                on: {
                    change: this.handleTaskChange,
                    input: this.inputTaskChanged
                },
                attrs: {
                    wrap:true
                },
                props: {
                    value: this.activeNames
                }
            }
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
    .row {
        align-content: center;

    }

    .task-column {
        float: left;
        width: 45%;
        border-style: solid;

    }

    #todo-tasks {
        margin-left: 5%;
        padding-right: 10px;
    }

    #done-tasks {
        margin-right: 5%;
        padding-left: 10px;
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }
</style>