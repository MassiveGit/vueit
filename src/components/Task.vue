<template>
    <!--<transition name="fade">-->
    <div>
        <div class="inProgText" v-if="task.status == 'INPRG'">IN PROGRESS</div>
        <div class="task" v-bind:class="[this.task.type, this.task.status]" @click="toggleDesc">
            <div class="task-text">
                <h3 class="taskName">{{task.name}}</h3>
                <p v-if="showDesc" class="taskDesc">{{task.description}}</p>
            </div>
          <div id="taskControls">
            <delete-task-button @delete-task="deleteTask"></delete-task-button>
            <doing-task-button v-if="task.status === 'NEW' || task.status == 'INPRG'" @doing-task="doingTask"></doing-task-button>
          </div>

        </div>
    </div>

    <!--</transition>-->


</template>

<script>
import DeleteTaskButton from "./deleteTaskButton";
import DoingTaskButton from "./doingTaskButton";
import ApiInteractions from "../services/ApiInteractions";
export default {
  name: 'tasks',
    components: {DeleteTaskButton, DoingTaskButton},
    props: {
        task: Object
    },
    data() {
      return {
          showDesc: false
      }

    },
    computed: {
    },
    methods: {
      deleteTask() {
          ApiInteractions.deleteTask(this.task.project_id, this.task.id);
          this.$emit('delete-task', this.task.id)
      },
        doingTask() {
            this.$emit('doing-task', this.task.id)
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
}

.task:hover {
    background-color: #0080FF;
}

.task-text {
    padding-left: 20px;
    width: 85%; /* Used in combination with overflow-wrap to ensure long titles don't shunt out the control buttons */

}

.taskName {
    text-align: left;
    display: block;
    padding: 2px;
    overflow-wrap: break-word;


}

.taskDesc {
    padding: 2px;
    overflow-wrap: break-word;

}

.inProgText {
    float: left;
    transform: rotate(90deg);
    margin-top: 10px;
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
    text-align: left;

}

#taskControls {
  justify-content: flex-end;
}

/* TASK FEATURE and BUG are the three currently supported task types. This CSS is used to statically colour code them */
.TASK {
    background-color: aqua;

}

.FEATURE {
    background-color: lightgreen;

}

.BUG {
    background-color: lightcoral;

}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
