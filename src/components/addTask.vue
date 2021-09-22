<template>
    <button  v-if="!showForm" @click.stop="showTaskForm">Add Task</button>
    <form
        id="task-form"
        v-else-if="showForm"
        v-click-outside="hideTaskForm"
    v-on:submit.prevent="checkForm"
    >

        <div id="errors" v-if="errors.length">
            <p> please correct the following errors:</p>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </div>

        <p>
            <label for="name">Task Name:</label>
            <input
                id="name"
                type="text"
                v-focus
                v-model.trim="formBody.name"
                name="name"
            >
        </p>
        <p>
            <label for="desc">Task Description:</label>
            <input
                id="desc"
                type="text"
                v-model.trim="formBody.description"
                name="desc"
            >
        </p>
        <p>
            <label for="type">Task Type:</label>
            <select
                id="type"
                name="type"
                v-model="formBody.type"
            >
                <option v-for="typeEnum in typeEnums" :value="typeEnum.value" :key="typeEnum.value">{{typeEnum.text}}</option>
            </select>
        </p>
        <p>
            <label for="priority">Task Priority:</label>
            <select
                id="priority"
                name="priority"
                v-model="formBody.priority"
            >
                <option v-for="priorityEnum in priorityEnums" :value="priorityEnum.value" :key="priorityEnum.value">{{priorityEnum.text}}</option>
            </select>
        </p>

        <p>
            <input
                type="submit"
                value="Create task"
                >
        </p>
    </form>

</template>

<script>
    import ApiInteractions from '@/services/ApiInteractions.js';

    export default {
        name: "addTask",
        props: ['projectId'],
        data() {
            return {
                formBody: {
                    name: null,
                    description: null,
                    type: "TASK",
                    priority: "MEDIUM",
                },
                errors: [],
                showForm: false,
                typeEnums: [
                    {text: "TASK", value: "TASK"},
                    {text: "FEATURE", value: "FEATURE"},
                    {text: "BUG", value: "BUG"},
                    {text: "CLICK ME!", value: "WRONG"}
                    ],
                priorityEnums: [
                    {text: "HIGH", value: "HIGH"},
                    {text: "MED", value: "MEDIUM"},
                    {text: "LOW", value: "LOW"},
                    ]
            }
        },
        methods: {

            showTaskForm() {
                this.showForm = true;

            },

            hideTaskForm() {
                this.showForm = false;
                this.resetForm();

            },

            checkForm() {

                if (this.formBody.name) {
                    return this.submitForm()
                }

                this.errors = []; //reset otherwise once you pop you just can't stop

                if (!this.formBody.name) {
                    this.errors.push('Task name required');
                }
            },

            resetForm() {
                this.formBody.name = null,
                this.formBody.description = null,
                this.showForm = false
            },

            submitForm() {
              ApiInteractions
                  .postTask(this.projectId,  this.formBody)
                .then(response => {
                    console.log("response.data.newTask[0] is:", response.data.newTask[0]);
                    this.$emit('task-added', response.data.newTask[0]);
                })
                .catch((error) => {
                    console.log(error);
                })

                this.resetForm();

            }

        }
    }
</script>

<style scoped>

#errors {
    color: red;
}
form {
    width: fit-content;
    border-style: groove;
    border-color: blue;
    background-color: aquamarine;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin: 0 0 1em 0;
}

label {
    float:left;
}


</style>