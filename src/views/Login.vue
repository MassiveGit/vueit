<template>
  <div className="login">
    <h1>Login</h1>
    <form
        id="loginrForm"
        v-on:submit.prevent="validateAndSubmitForm"
    >
      <p className="error" v-if="server_error.length">{{ server_error[0] }}</p>
      <p>
        <label htmlFor="username">Username:</label>
        <input
            id="username"
            type="text"
            v-focus
            v-model.trim="formData.username"
            name="username"
        >
      </p>
      <p className="error" v-if="username_error.length">{{ username_error[0] }}</p>
      <p>
        <label htmlFor="password">Password:</label>
        <input
            id="password"
            type="password"
            v-model.trim="formData.password"
            name="password"
        >
      </p>
      <p className="error" v-if="password_error.length">{{ password_error[0] }}</p>
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
  title: "Vueit - Login",
  components: {},
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

    validateAndSubmitForm() {
      this.password_error = [];
      this.username_error = [];
      this.server_error = [];

      console.log('Validating User Login request');
      //This validation isn't really useful in Login page, but leaving in cos why not?
      if (!this.formData.username.length || this.formData.username.length < 3) {
        this.username_error.push("Username must be 3 or more Chars");
      }
      if (!this.formData.password || this.formData.password.length < 8) {
        this.password_error.push("Password must be 8 or more Chars");
      }

      if (this.username_error.length || this.password_error.length) {
        console.log("Login validation error before submission");
        return;
      }
      console.log("Submitting User Login request");


      //Logout user if exists
      localStorage.removeItem('user');


      ApiInteractions
          .postSignin(this.formData)
          .then(response => {
            console.log(response);
            if (response.data.access_token) {
              console.log("Setting token");

              localStorage.setItem('user', JSON.stringify(response.data));
              this.$store.commit("setIsAuthenticated", true);

              console.log('user set to localstorage: ' + localStorage.getItem('user'));
              console.log("Redirecting to Projects page");
              this.$router.push({ name: 'projects'});
              //extract User name from data
            }

          })
          .catch((error) => {
            //display error message
            this.server_error.push(error.response.data);

            //Log user out
            localStorage.removeItem('user');
            this.$store.commit("setIsAuthenticated", false);

            console.log("User Signup request returned error status: " + error.response.status);
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