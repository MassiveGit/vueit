<template>
    <div class="register">
        <h1>Register</h1>
        <form
        id="registerForm"
        v-on:submit.prevent="validateAndSubmitForm"
        >
          <p class="error" v-if="server_error.length">{{server_error[0]}}</p>
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
            <p class="error" v-if="username_error.length">{{username_error[0]}}</p>
            <p>
                <label for="password">Password:</label>
                <input
                        id="password"
                        type="password"
                        v-model.trim="formData.password"
                        name="password"
                >
            </p>
          <p class="error" v-if="password_error.length">{{password_error[0]}}</p>
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
          username_error: [],
          password_error: [],
          server_error: [],
            formData: {
                username: null,
                password: null,
            }
        }
    },
    methods: {

        validateAndSubmitForm(){
          this.password_error=[];
          this.username_error=[];
          this.server_error=[];

            console.log('Validating User Signup request');
            if(!this.formData.username.length || this.formData.username.length < 3){
                this.username_error.push("Username must be 3 or more Chars");
            }
            if(!this.formData.password || this.formData.password.length < 8){
                this.password_error.push("Password must be 8 or more Chars");
            }

            if(this.username_error.length || this.password_error.length){
              console.log("Registration error before submission");
              return;
            }
            console.log("Submitting User Signup request");


            ApiInteractions
            .postSignup(this.formData)
            .then(response => {
                console.log(response);
                if(response.data.access_token) {
                  localStorage.setItem('user', JSON.stringify(response.data));
                }
                //Check if response status was 200
                //Add response data to browser memory
                //extract User name from data
            })
          .catch((error) => {
            this.server_error.push(error.response.data);
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