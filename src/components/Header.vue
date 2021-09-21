<template>
<div>
    <h1>Header</h1>
</div>
</template>

<script>
import DeleteTaskButton from "./deleteTaskButton";
import ApiInteractions from "../services/ApiInteractions";
export default {
  name: 'tasks',
    components: {DeleteTaskButton},
    props: {
        task: Object
    },
    data() {
      return {
          showDesc: false
      }

    },
    methods: {

      deleteTask() {
          ApiInteractions.deleteTask(this.task.project_id, this.task.id);
          this.$emit('delete-task')
      },
        toggleDesc() {
          this.showDesc = !this.showDesc;

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task {
    /* align-content: center;
     */
    display: flex;
    justify-content: space-between;
    border-style: solid;
    border-color: black;
    border-radius: 15px;
    padding-bottom: 2px;
    margin-bottom: 2px;
    background-color: aqua;
}

.task-text {
    padding-left: 20px;

}

.taskName {

    display: block;
    padding: 2px;

}

.taskDesc {
    float: right;
    display: inline;
    padding: 2px;


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
p {
    float: left;

}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
