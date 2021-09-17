<template>
    <div class="tasks">
        <h1>Tasks page for project {{projectId}}</h1>

        <div class="row">
            <p v-if="tasks.length == 0">There are no tasks yet for this project</p>
            <div class="task-column" id="todo-tasks">
                <h3>TODO:</h3>
                <addTask @task-added="updateTasks" :projectId="projectId"></addTask>
                <draggable class="h-100" v-model="todoTasks" animation="200" group="taskState" @add="onAdd($event, 'NEW')" :component-data="getComponentData()">
                    <Task @delete-task="removeTaskFromList(index)" v-for="(task, index) in todoTasks" :key="task.id" :data-id="task.id" :task="task"></Task>
                </draggable>


            </div>
            <div class="task-column" id="done-tasks">
                <h3>DONE:</h3>
                <draggable class="h-100" v-model="doneTasks" animation="200" group="taskState" @add="onAdd($event, 'DONE')">
                    <Task @delete-task="removeTaskFromList(index)" v-for="(task, index) in doneTasks" :key="task.id" :data-id="task.id" :task="task"></Task>
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
            tasks: [],
            todoTasks: [], //Vue.draggable doesn't appear to work well with filters, so have to duplicate tasks array into it's separate state based arrays. This has led to the janky array refresh method below.
            doneTasks: []

        }
    },
    computed: {
        incompleteTasksComputed() {
            return this.tasks.filter(function (task) {
                return task.status.indexOf('NEW')!== -1
            })
        },

        completeTasksComputed() {
            return this.tasks.filter(function (task) {
                return task.status.indexOf('DONE')!== -1
            })
        },


    },
    methods: {
        onAdd(event, status){
            if (status == "DONE" || status == "NEW") {
                let taskId = event.item.getAttribute('data-id');
                console.log("id of task is:", taskId);
                let taskIndex = this.tasks.findIndex((obj => obj.id === parseInt(taskId)));
                console.log("index of task is: ", taskIndex);
                console.log("taskID is: ", taskId);
                console.log(this.tasks[2].id);
                this.tasks[taskIndex].status = status;
            } else {
                console.log("Oi, stop that :(");
            }
            //ApiInteractions.updateTask(this.task.project_id, this.task.id);
        },
        removeTaskFromList(index){
            this.tasks.splice(index, 1);
            this.refreshTaskStateLists();
        },
        incompleteTasks() {
            return this.tasks.filter(function (task) {
                return task.status.indexOf('NEW')!== -1
            })
        },

        completeTasks() {
            return this.tasks.filter(function (task) {
                return task.status.indexOf('DONE')!== -1
            })
        },

        refreshTaskStateLists() {
            this.todoTasks = this.incompleteTasks()
            this.doneTasks = this.completeTasks()
        },

        updateTasks(newTask){
            this.tasks.push(newTask);
            this.refreshTaskStateLists();
            console.log(this.tasks)
        },
        handleTaskChange() {
            console.log('task state updated');
        },
        inputTaskChanged(value) {
            console.log(value);
        },
        getComponentData() { //This is not used for anything...
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
                this.refreshTaskStateLists()

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

    }

    #todo-tasks {
        margin-left: 5%;
        padding-right: 10px;
        background-color: brown;
    }

    #done-tasks {
        margin-right: 5%;
        padding-left: 10px;
        background-color: blue;
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }
</style>