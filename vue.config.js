// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // options...
    //Specify if the hosted path of this app is NOT root (i.e. /)
    publicPath: '/',
    chainWebpack: config => {
        config
            .plugin("html")
            .tap(args => {
                args[0].template = './public/index.html'
                return args
            })
    }


}