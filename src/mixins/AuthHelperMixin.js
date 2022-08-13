import jwt_decode from "jwt-decode";


export default {
    methods: {
        //Used when clearing data on the login/register page before submitting new credentials. Don't want to push the user to a page they're already on...
        logout() {
            localStorage.removeItem('user');
            this.$store.commit("setIsAuthenticated", false);
        },

        logoutAndRedirect() {
            localStorage.removeItem('user');
            this.$store.commit("setIsAuthenticated", false);
            this.$router.push({ name: 'login'});  //impl
        },

        login(user_token){
            const decoded = jwt_decode(user_token.access_token);

            //Add username to store
            this.$store.commit("setUsername", decoded.username);

            console.log(decoded);
            localStorage.setItem('user', JSON.stringify(user_token));
            this.$store.commit("setIsAuthenticated", true);
            this.$router.push({ name: 'projects'});
        }
    }
};
