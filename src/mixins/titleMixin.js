
//Mixin to set the title on each route.
//doing it this way cos I CBF understanding how webpack works...

function getTitle (vm) {
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}
export default {
    created () {
        const title = getTitle(this)
        if (title) {
            document.title = title
        }
    }
}