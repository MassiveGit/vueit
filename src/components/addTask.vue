<template>
    <button class="addButton" v-if="!showForm" @click.stop="showTaskForm">+</button>
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
                placeholder="Optional"
            >
        </p>
        <p>
            <label for="type">Task Type:</label>
            <select
                id="type"
                name="type"
                v-model="formBody.type"
            >
                <option v-for="typeEnum in typeEnums" :value="typeEnum.value" :key="typeEnum.value" :style="{backgroundColor: typeEnum.colour}">{{typeEnum.text}}</option>
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
                    {text: "TASK", value: "TASK", colour: "aqua"},
                    {text: "FEATURE", value: "FEATURE", colour: "lightgreen"},
                    {text: "BUG", value: "BUG", colour: "lightcoral"}
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
    border-style: solid;
    border-color: black;
    border-radius: 25px;
    padding: 5px;
    background-color: aquamarine;
    margin-bottom: 2px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin: 0 0 1em 0;
}

label {
    float:left;
}

.addButton {
    width: 100%;
    background-color: #0080FF;
    color: black;
    font-size: xx-large;
    border-radius: 25px;
    border-color: black;
    border-style: solid;
    margin: 5px auto;
    padding: 10px;
    margin-bottom: 2px;

}

.addButton:hover {
    background-color: aqua;
}


</style>