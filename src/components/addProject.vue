<template>
    <button class="create-project"  v-if="!showForm" @click.stop="showTaskForm">+</button>
    <form
        id="project-form"
        v-else-if="showForm"
        v-click-outside="hideTaskForm"
    v-on:submit.prevent="checkForm"
    >

        <div id="errors" v-if="errors.length">

        </div>

        <p>
            <label for="name">Project Name:</label>
            <input
                id="name"
                type="text"
                v-model.trim="formBody.name"
                v-focus
                name="name"
            >
        </p>
    </form>

</template>

<script>
    import ApiInteractions from '@/services/ApiInteractions.js';

    export default {
        name: "addProject",
        props: ['projectId'],
        data() {
            return {
                formBody: {
                    name: null,
                },
                errors: [],
                showForm: false,
            }
        },
        methods: {

            showTaskForm() {
                this.showForm = true
            },

            hideTaskForm() {
                this.showForm = false
                this.formBody.name = null

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

            submitForm() {
              ApiInteractions
                  .postProject(this.formBody)
                .then(response => {
                    console.log("Project created", response.data.newProject[0]);
                    this.$emit('project-added', response.data.newProject[0]);
                    this.$store.commit('addProject', response.data.newProject[0]); //Committing to store before redirecting to tasks page, because tasks page looks at the store to find Project Name etc.
                    this.$router.push({ name: 'tasks', params: {projectId: response.data.newProject[0].id}})
                })
                .catch((error) => {
                    console.log(error);
                })

                //reset the form
                this.formBody.name = null,
                this.showForm = false
            }

        }
    }
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 10px 0 0;
}
li {
    display: inline-block;
    margin: 0 30px;
}
a {
    color: #42b983;
}
.create-project, #project-form {
    background-color: #42b983;
    color: black;
    font-size: xx-large;
    border-radius: 25px;
    border-color: black;
    border-style: solid;
    margin: 5px auto;
    padding: 10px;
    width: 50%;
}

.create-project:hover {
    background-color: blueviolet;
}


</style>