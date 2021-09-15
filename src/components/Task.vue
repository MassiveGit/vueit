<template>
    <transition name="fade">
        <div class="task">
            <h3 class="taskName">{{task.name}}</h3>
            <p class="taskDesc">{{task.description}}</p>
            <delete-task-button @delete-task="deleteTask"></delete-task-button>
        </div>
    </transition>


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

    methods: {

      deleteTask() {
          ApiInteractions.deleteTask(this.task.project_id, this.task.id);
          this.$emit('delete-task')
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task {
    align-content: center;
    border-style: solid;
    border-color: black;
    border-radius: 15px;
    padding-bottom: 2px;
    margin-bottom: 2px;
    background-color: aqua;
}

.taskName {
    display: inline;
    padding: 2px;

}

.taskDesc {
    float: right;
    display: inline;
    padding: 2px;


}

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
p {
    float: left;

}

.fade-enter-active, .fade-leave-active {
    transition: opacity .75s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
