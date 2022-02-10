<template>
    <div class="tasks">
        <h1>Tasks page for project {{projectId}}</h1>

        <div class="row">
            <p v-if="tasks.length == 0">There are no tasks yet for this project</p>
            <div class="task-column" id="todo-tasks">
                <h3 class="header mt-2">TODO:</h3>
                <addTask @task-added="updateTasks" :projectId="projectId"></addTask>
                <draggable class="h-100" v-model="todoTasks" animation="200" group="taskState" handle=".taskName" @add="onAdd($event, 'NEW')" @change="updateTaskListOrder('NEW')" :component-data="getComponentData()">
                    <Task @delete-task="removeTaskFromList" @doing-task="toggleTaskInProgress" v-for="(task) in todoTasks" :key="task.id" :data-id="task.id" :task="task"></Task>
                </draggable>


            </div>
            <div class="task-column" id="done-tasks">
                <h3 class="header mt-2">DONE:</h3>
                <draggable class="h-100" v-model="doneTasks" animation="200" group="taskState" @add="onAdd($event, 'DONE')" @change="updateTaskListOrder('DONE')">
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
            if (status == "DONE" || status == "INPRG" || status == "NEW") {
                let taskId = event.item.getAttribute('data-id');
                let task = this.findTaskById(taskId);
                console.log(task);
                this.patchTaskStatus(task, status)
            } else {
                console.log("Oi, stop that :(");
            }
        },

        toggleTaskInProgress(id){
            let task = this.findTaskById(id);
            if (task.status === 'INPRG') {
                this.patchTaskStatus(task, "NEW");
            }

            if (task.status === 'NEW') {
                this.patchTaskStatus(task, "INPRG");
            }
        },
        patchTaskStatus(task, status){
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
                        console.log("Task: " + updatedTask.name  + " Status updated to: " + updatedTask.status + " Order is: " + updatedTask.order_id);
                        this.updateTaskListOrder(status); //called to ensure tasks index is set correctly in new state, before refreshing the state arrays.
                        this.refreshTaskStateLists();
                    } else {
                        console.log("task update failed - returned taskId " + updatedTask.id + " did not match ID of submitted task: " + task.id);
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateTaskListOrder(status){
            console.log('updateListOrder called for state: ' + status);
            if(status == 'NEW' || status == "INPRG") {
                this.todoTasks.map((task, index) => {
                  console.log('Task being ordered: ' + task.name);
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
                return task.status.indexOf('NEW')!== -1 || task.status.indexOf('INPRG')!== -1
            })
        },

        completeTasks() {
            return this.tasks.filter(function (task) {
                return task.status.indexOf('DONE')!== -1
            })
        },

        refreshTaskStateLists() {
          //So uh, because I'm deriving the todo/done task lists from this.tasks, they also inherit its ordering... which was only set on first page load. Reordering this.tasks each time task state lists are updated, prevents weird order changes.
            this.tasks = this.tasks.sort((a,b) => a.order_id-b.order_id);
            this.todoTasks = this.incompleteTasks()
            this.doneTasks = this.completeTasks()
        },

        updateTasks(newTask){
            this.tasks.push(newTask);
            this.refreshTaskStateLists();
            this.updateTaskListOrder("NEW");
            console.log(this.tasks);
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