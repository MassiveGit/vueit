<template>
    <div class="register">
        <h1>Register</h1>
        <form
        id="registerForm"
        v-on:submit.prevent="validateAndSubmitForm"
        >
            <p>
                <label for="username">Username:</label>
                <input
                        id="username"
                        type="text"
                        v-focus
                        v-model.trim="formData.username"
                        name="username"
                >
            </p>
            <p>
                <label for="password">Password:</label>
                <input
                        id="password"
                        type="password"
                        v-model.trim="formData.password"
                        name="password"
                >
            </p>
            <p>
                <input
                        type="submit"
                        value="Create Account"
                >
            </p>
        </form>


    </div>
</template>

<script>
import ApiInteractions from '@/services/ApiInteractions.js';


export default {
    title: "Vueit - Register",
    components: {
    },
    data() {
        return {
            formData: {
                username: null,
                password: null,
            }
        }
    },
    methods: {

        validateAndSubmitForm(){

            console.log('Submitting User Signup request');
            if(!this.formData.username.length || this.formData.username.length < 5){
                console.log("Username must be 5 or more Chars");
                return;
            }
            if(!this.formData.password || this.formData.password.length < 8){
                console.log("Password must be 8 or more Chars");
                return;
            }


            ApiInteractions
            .postSignup(this.formData)
            .then(response => {
                console.log(response);
                //Check if response status was 200
                //Add response data to browser memory
                //extract User name from data
            })
          .catch((error) => {
            console.log("User Signup request returned error status: " + error.response.status);
            console.log(error.response.data);
            console.log(error.response.headers);
          })
        },

    },
    created() {
        //Check if user already logged in????
    }

}
</script>

<style scoped>

    .register {
        background-color: red;
    }

</style>