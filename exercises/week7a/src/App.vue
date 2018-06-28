<template>
  <div id="app">
    <the-header />
    <new-task-form @addTask="addTask" />
    <!-- <form @submit.prevent="addTask(newTask)">
      <input type="text" v-model="newTask.title" placeholder="title">
      <input type="text" v-model="newTask.dueAt" placeholder="Due Date">
      <button type="submit">Add Task</button>
    </form> -->
    <div class="toolbar">
      <!-- TODO: Add filter dropdowns -->
      <button @click="toggleSort">Toggle Sort</button>
    </div>
    <section class="task-list">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <span @click="toggleDone(task)">{{ task.isComplete ? 'DONE' : 'TODO' }}</span>
        <span>{{ task.title }}</span>
        <span>{{ task.dueAt }}</span>
        <button @click="deleteTask(task)">DELETE</button>
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import NewTaskForm from '@/components/NewTaskForm'
import { db } from '@/firebaseService'
const tasksRef = db.collection('tasks')

export default {
  name: 'app',
  components: { TheHeader, NewTaskForm },
  data: () => ({
    tasks: [],
    activeTasks: [],
    overdueTasks: [],
    newTask: {},
    sortOrder: 'asc' // 'asc' or 'desc'
  }),
  // If we want to be able to reference other properties of our view component
  // via "this", then we need to express the firestore option as a function
  // returning an object e.g. firestore () { return {} }
  // rather than as a property holding an object e.g. firestore: {}
  firestore () {
    return {
      tasks: tasksRef.orderBy('dueAt', this.sortOrder),
      // We can offload the filtering to the Firestore database server instead
      // of doing it on the client.
      activeTasks: tasksRef.where('isComplete', '==', false),
      overdueTasks: tasksRef
        .where('isComplete', '==', false)
        // We need to provide a string formatted date for comparison.
        // We cannot access "this" inside the firestore constuctor so we
        // cannot use our computed property and we'll have to replcate our code.
        .where('dueAt', '<', (new Date()).toISOString().split('T')[0])
    }
  },
  computed: {
    currentDate () { return (new Date()).toISOString().split('T')[0] },
    // Of course we can still do the filtering on the client if we need to.
    completedTask () {
      return this.tasks.filter(t => t.isComplete)
    }
  },
  // The firestore() uses the data property "sortOrder" as a parameter in
  // binding the firestore collection to our local data property "tasks".
  // However, this method only fires once on component setup. To make it
  // reactive we need to add a watcher to rebind the firestore collection.
  watch: {
    sortOrder (newValue, oldValue) {
      // The $bind function will automatically unbind the previous value,
      // but if you ever need to explicitly remove the firestore binding,
      // you can use this.$unbind('tasks')
      this.$bind('tasks', tasksRef.orderBy('dueAt', newValue))
    }
  },
  created () {
    this.reset()
  },
  methods: {
    addTask (task) {
      tasksRef.add(task)
    },
    deleteTask (task) {
      tasksRef.doc(task.id).delete()
    },
    toggleDone (task) {
      tasksRef.doc(task.id).update({
        isComplete: !task.isComplete
      })
    },
    toggleSort () {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
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
  margin-top: 60px;
}

.task-item {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr auto auto;
  margin: 1rem;
  text-align: left;
}

.toolbar {
  background: hsl(0, 0%, 98%);
  padding: 1rem;
  margin: 1rem 0px;
  display: flex;
  justify-content: space-between;
}
</style>
