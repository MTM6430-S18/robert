<template>
  <div id="app">
    <header>
      <img style="height: 4rem; width: auto;" src="@/assets/logo.png" alt="Vue.js logo">
      <h1>Vue Todos</h1>
      <p>{{ (new Date()).toDateString() }}</p>
    </header>

    <new-task-form @addTask="addTask" />

    <task-list
      :tasks="overdueTasks"
      class="overdue"
      @updateTask="updateTask"
      @toggleDone="toggleDone"
      @deleteTask="deleteTask"/>

    <task-list
      :tasks="inprogressTasks"
      @updateTask="updateTask"
      @toggleDone="toggleDone"
      @deleteTask="deleteTask"/>

    <task-list
      :tasks="completedTasks"
      class="completed"
      @updateTask="updateTask"
      @toggleDone="toggleDone"
      @deleteTask="deleteTask"/>
  </div>
</template>

<script>
import NewTaskForm from '@/components/NewTaskForm'
import TaskList from '@/components/TaskList'

export default {
  name: 'app',
  components: { NewTaskForm, TaskList },
  data: () => ({
    newTask: {},
    tasks: [
      { id: 1, title: 'Learn Vue', dueAt: '2018-08-17', isComplete: false },
      { id: 2, title: 'Learn ES2015', dueAt: '2018-05-07', isComplete: false },
      { id: 3, title: 'Learn ES2018', dueAt: '2018-05-28', isComplete: false },
      { id: 4, title: 'Learn ES2017', dueAt: '2018-05-21', isComplete: false },
      { id: 5, title: 'Learn ES2016', dueAt: '2018-05-14', isComplete: false },
      { id: 6, title: 'Learn Vue-Router', dueAt: '2018-06-15', isComplete: false },
      { id: 7, title: 'Midterm Project 1', dueAt: '2018-05-28', isComplete: true },
      { id: 8, title: 'Quiz - JS', dueAt: '2018-05-21', isComplete: true },
      { id: 9, title: 'Quiz - Vue Basics', dueAt: '2018-06-12', isComplete: false },
      { id: 10, title: 'Midterm Project 2', dueAt: '2018-05-28', isComplete: false }
    ]
  }),
  computed: {
    activeTasks () {
      return this.tasks.filter(task => !task.isComplete)
    },
    completedTasks () {
      return this.tasks.filter(task => task.isComplete)
    },
    overdueTasks () {
      return this.activeTasks.filter(
        task => new Date(task.dueAt) < Date.now()
      )
    },
    inprogressTasks () {
      return this.activeTasks.filter(
        task => new Date(task.dueAt) >= Date.now()
      )
    }
  },
  methods: {
    toggleDone (task) {
      task.isComplete = !task.isComplete
    },
    addTask (task) {
      this.tasks.push(task)
    },
    deleteTask (task) {
      let index = this.tasks.indexOf(task)
      this.tasks.splice(index, 1)
    },
    updateTask (task) {
      let index = this.tasks.findIndex(t => t.id === task.id)
      this.tasks.splice(index, 1)
      this.tasks.push(task)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 1rem;
}
header {
  text-align: center;
}
ul {
  padding: 0;
}
</style>
