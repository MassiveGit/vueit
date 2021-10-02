<template>
    <div class="tasks">
        <h1>Tasks page for project {{projectId}}</h1>

        <div class="row">
            <p v-if="tasks.length == 0">There are no tasks yet for this project</p>
            <div class="task-column" id="todo-tasks">
                <h3 class="header mt-2">TODO:</h3>
                <addTask @task-added="updateTasks" :projectId="projectId"></addTask>
                <draggable class="h-100" v-model="todoTasks" animation="200" group="taskState" @add="onAdd($event, 'NEW')" @change="updateTaskListOrder($event, 'NEW')" :component-data="getComponentData()">
                    <Task @delete-task="removeTaskFromList" v-for="(task) in todoTasks" :key="task.id" :data-id="task.id" :task="task"></Task>
                </draggable>


            </div>
            <div class="task-column" id="done-tasks">
                <h3 class="header mt-2">DONE:</h3>
                <draggable class="h-100" v-model="doneTasks" animation="200" group="taskState" @add="onAdd($event, 'DONE')" @change="updateTaskListOrder($event, 'DONE')">
                    <Task @delete-task="removeTaskFromList" v-for="(task) in doneTasks" :key="task.id" :data-id="task.id" :task="task"></Task>
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
            todoTasks: [], //Vue.draggable doesn't appear to work well with filters, so have to duplicate tasks array into separate state based arrays. This has led to the janky array refresh method below.
            doneTasks: []

        }
    },
    computed: {
    },
    methods: {
        onAdd(event, status){
            if (status == "DONE" || status == "NEW") {
                let taskId = event.item.getAttribute('data-id');
                let task = this.findTaskById(taskId);
                console.log(task);
                let data = JSON.stringify({
                    status: status
                })

                ApiInteractions
                    .patchTask(task.project_id, task.id, data)
                .then(response => {
                    console.log(response.data);
                    let updatedTask = response.data.updatedTask[0];
                    if (updatedTask.id == task.id){
                        let taskIndex = this.findTaskIndexById(task.id);
                        this.tasks[taskIndex] = updatedTask;
                        //this.refreshTaskStateLists();
                    } else {
                        console.log("task update failed - returned taskId " + updatedTask.id + " did not match ID of submitted task: " + task.id);
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            } else {
                console.log("Oi, stop that :(");
            }
            //ApiInteractions.updateTask(this.task.project_id, this.task.id);
        },
        updateTaskListOrder(event, status){
            console.log('updateListOrder called for state: ' + status);
            if(status == 'NEW') {
                this.todoTasks.map((task, index) => {
                    task.order_id = index + 1;
                })

                ApiInteractions
                    .updateTasksOrder(this.projectId, this.todoTasks)
                    .then(response => {
                        console.log(response);
                    })
            }
            else if(status == 'DONE') {
                this.doneTasks.map((task, index) => {
                    task.order_id = index + 1;
                })

                ApiInteractions
                    .updateTasksOrder(this.projectId, this.doneTasks)
                    .then(response => {
                        console.log(response);
                    })
            }


        },
        findTaskIndexById(id){
            return this.tasks.findIndex((obj => obj.id === parseInt(id)));
        },
        findTaskById(id){
            return this.tasks[this.findTaskIndexById(id)];
        },
        removeTaskFromList(id){
            let taskIndex = this.findTaskIndexById(id);
            this.tasks.splice(taskIndex, 1);
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
                this.tasks = response.data.tasks.sort((a,b) => a.order_id-b.order_id);
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

    .header {
        font-size: xx-large;
    }

    .task-column {
        float: left;
        width: 41%;
        border-radius: 15px;
        background-color: #A8A6A5;
        margin-bottom: 2%;

    }

    #todo-tasks {
        margin-left: 5%;
        padding-right: 10px;
        margin-right: 0.5%;
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