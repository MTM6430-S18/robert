<template>
  <div id="app">
    <img style="height: 4rem; width: auto;" src="@/assets/logo.png" alt="Vue.js logo">
    <h1>Vue Todos</h1>
    <label>
      Title
      <input type="text" v-model.trim="newTask.title">
    </label>
    <label>
      Due At
      <input type="date" v-model="newTask.dueAt">
    </label>
    <button @click="addTask">Add Task</button>
    <ul>
      <task-list-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggleDone="toggleDone"
        @deleteTask="deleteTask" />
    </ul>
  </div>
</template>

<script>
import TaskListItem from '@/components/TaskListItem'
export default {
  name: 'app',
  components: { TaskListItem },
  data: () => ({
    newTask: {},
    tasks: [
      { id: 1, title: 'Learn Vue', dueAt: '2018-08-17', isComplete: false },
      { id: 2, title: 'Learn ES2015', dueAt: '2018-05-31', isComplete: false }
    ]
  }),
  methods: {
    toggleDone (task) {
      task.isComplete = !task.isComplete
    },
    addTask () {
      this.tasks.push(this.newTask)
      this.resetNewTask()
    },
    deleteTask (task) {
      let index = this.tasks.indexOf(task)
      this.tasks.splice(index, 1)
    },
    resetNewTask () {
      this.newTask = {
        id: Date.now(),
        title: '',
        dueAt: '',
        isComplete: false
      }
    }
  },
  created () {
    this.resetNewTask()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 1rem;
}
</style>
