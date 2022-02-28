# vueit

View + Model-View aspect of the Trakit application.
Technologies:
* Vue 2
* Vuex
* Axios - API calls
* Vue Router

## Lessons Learned
1. Implement data model before View layer. Mucking around with CSS and JS is fun and gives instant gratification, but sucks up a lot of time, and is likely to be changed later
2. Take time to set up State Management at the beginning. Because I focused on instant gratification first, it's become a headache with no visual reward to go through and add it now.
3. Find a library to solve the problem. Don't reinvent the wheel.
4. JWT doesn't go deal with user logout very well. If a user logs out in the client, you can flush the jwt, but if they kept a copy it could be redeemed against the server until the ttl expired. There are workarounds and maybe it's not crucial in most applications, but it's an interesting downside for some.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


