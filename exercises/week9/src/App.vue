<template>
  <div id="app">
    <the-header v-once />
    <new-task-form
      :categories="categoryOptions"
      :priorities="priorityOptions"
      @addTask="addTask"
    />

    <nav>
      <button
        class="nav-item"
        :class="{selected: selectedNav === 'active'}"
        @click="selectedNav = 'active'"
      >Active Tasks</button>
      <button
        class="nav-item"
        :class="{selected: selectedNav === 'completed'}"
        @click="selectedNav = 'completed'"
      >Completed Tasks</button>
    </nav>

    <div class="toolbar">
      <select v-model="selectedPriority">
        <option value="">All Priorities</option>
        <option
          v-for="option in priorityOptions"
          :key="option.id"
          :value="option.id"
        >{{option.name}}</option>
      </select>
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option
          v-for="option in categoryOptions"
          :key="option.id"
          :value="option.id"
        >{{option.name}}</option>
      </select>
      <button @click="toggleSort">
        <font-awesome-icon :icon="['fas', 'sort']" /> Sort
      </button>
    </div>

    <task-list
      :tasks="sortedTasks"
      @deleteTask="deleteTask"
      @toggleDone="toggleDone"
    />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import NewTaskForm from '@/components/NewTaskForm'
import TaskList from '@/components/TaskList'
import { db } from '@/firebaseService'
const tasksRef = db.collection('tasks')

export default {
  name: 'app',
  components: { TheHeader, NewTaskForm, TaskList },
  data: () => ({
    tasks: [],
    activeTasks: [],
    overdueTasks: [],
    newTask: {},
    sortAscending: true,
    priorityOptions: [
      { id: 'high', name: 'high' },
      { id: 'medium', name: 'medium' },
      { id: 'low', name: 'low' }
    ],
    categoryOptions: [
      { id: 'home', name: 'home' },
      { id: 'work', name: 'work' },
      { id: 'school', name: 'school' }
    ],
    selectedCategory: '',
    selectedPriority: '',
    selectedNav: 'active'
  }),
  firestore () {
    return {
      tasks: tasksRef.orderBy('dueAt', this.sortOrder),
      activeTasks: tasksRef.where('isComplete', '==', false),
      completedTasks: tasksRef.where('isComplete', '==', true),
      // we can chain multiple where conditions
      overdueTasks: tasksRef
        .where('isComplete', '==', false)
        .where('dueAt', '<', (new Date()).toISOString().split('T')[0])
    }
  },
  computed: {
    currentDate () { return (new Date()).toISOString().split('T')[0] },
    sortOrder () { return this.sortAscending ? 'asc' : 'desc' },
    visibleTasks () {
      return this[`${this.selectedNav}Tasks`]
    },
    categoryFilteredTasks () {
      return (!this.selectedCategory)
        ? this.visibleTasks
        : this.visibleTasks.filter(task => task.category === this.selectedCategory)
    },
    prirorityFilteredTasks () {
      return (!this.selectedPriority)
        ? this.visibleTasks
        : this.visibleTasks.filter(task => task.priority === this.selectedPriority)
    },
    filteredTasks () {
      // We can concatenate the results of the previous two computed properties.
      // Then we convert the combined array to a Set to eliminate the duplicates
      // and then extract the Set members back into an array, so that we can
      // use the reduce() method for the final merged results.
      const combinedFilterResults = [ ...new Set([
        ...this.prirorityFilteredTasks,
        ...this.categoryFilteredTasks
      ]) ]
      // Ensure that each task included in the final merged list appears in
      // each of the individual filter results. A returned task must meet all
      // filter requirements.
      return combinedFilterResults.reduce(
        (accumulator, task) => {
          if (
            this.prirorityFilteredTasks.includes(task) &&
            this.categoryFilteredTasks.includes(task)
          ) accumulator.push(task)

          return accumulator
        },
        [] // empty array is the starting value for the accumulator
      )
    },
    sortedTasks () {
      let tasks = [ ...this.filteredTasks ]
      return tasks.sort((a, b) => {
        const dateA = new Date(a.dueAt)
        const dateB = new Date(b.dueAt)
        return this.sortAscending ? (dateA - dateB) : (dateB - dateA)
      })
    }
  },
  watch: {
    tasks: {
      handler: function () { this.syncTasks() },
      deep: true
    },
    sortOrder (newValue, oldValue) {
      this.$bind('tasks', tasksRef.orderBy('dueAt', newValue))
    }
  },
  created () {
    // if firebase hasn't already loaded, try to get the last cached
    // taskList from localStorage
    if (!this.tasks) {
      this.tasks = JSON.parse(localStorage.getItem('taskList')) || []
    }
  },
  methods: {
    addTask (task) {
      tasksRef.add(task)
    },
    deleteTask (task) {
      tasksRef.doc(task.id).delete()
    },
    toggleDone (task) {
      tasksRef.doc(task.id).update({ isComplete: !task.isComplete })
    },
    toggleSort () {
      this.sortAscending = !this.sortAscending
    },
    syncTasks () {
      localStorage.setItem('taskList', JSON.stringify(this.tasks))
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
  margin-top: 20px;
}

.toolbar {
  background: hsl(0, 0%, 98%);
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
}

nav {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .nav-item {
    align-items: center;
    background: hsl(0, 0%, 98%);
    border: none;
    border-bottom: 2px solid transparent;
    display: flex;
    font-weight: 500;
    font-size: 1rem;
    justify-content: center;
    letter-spacing: 0.5px;
    outline: none;
    padding: 0.5rem;
    text-transform: uppercase;

    &.selected {
      border-bottom: 2px solid #2c3e50;
    }
  }
}
</style>
