
export default {
    methods: {
        logout() {
            localStorage.removeItem('user');
            this.$store.commit("setIsAuthenticated", false);
            this.$router.push({ name: 'login'});  //impl
        },

        login(user_token){
            localStorage.setItem('user', JSON.stringify(user_token));
            this.$store.commit("setIsAuthenticated", true);
            this.$router.push({ name: 'projects'});  //impl
        }
    }
};
