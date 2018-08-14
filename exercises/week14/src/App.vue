<template>
  <div id="app">
    <h1>Axios API Demo</h1>
    <div class="task-list">
      <div v-for="task of tasks" :key="task.id" class="task-item">
        <span>{{task.isComplete}}</span>
        <span>{{task.title}}</span>
        <span class="task-priority">{{task.priority | prioritySymbol}}</span>
        <span>{{new Date(task.dueAt).toDateString()}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'app',
  data: () => ({
    tasks: [
      { id: 1, title: 'Learn Vue', dueAt: '2018-08-17 10:30:00', isComplete: false, priority: { id: 1, name: 'low', order: 1 } },
      { id: 2, title: 'Learn ES2015', dueAt: '2018-05-07', isComplete: false, priority: { id: 2, name: 'medium', order: 2 } },
      { id: 3, title: 'Learn ES2018', dueAt: '2018-05-28', isComplete: false, priority: { id: 3, name: 'high', order: 3 } },
      { id: 4, title: 'Learn ES2017', dueAt: '2018-05-21', isComplete: false, priority: { id: 1, name: 'low', order: 1 } },
      { id: 5, title: 'Learn ES2016', dueAt: '2018-05-14', isComplete: false, priority: { id: 1, name: 'low', order: 1 } },
      { id: 6, title: 'Learn Vue-Router', dueAt: '2018-06-15', isComplete: false, priority: { id: 1, name: 'low', order: 1 } },
      { id: 7, title: 'Midterm Project 1', dueAt: '2018-05-28', isComplete: true, priority: { id: 1, name: 'low', order: 1 } },
      { id: 8, title: 'Quiz - JS', dueAt: '2018-05-21', isComplete: true, priority: { id: 1, name: 'low', order: 1 } },
      { id: 9, title: 'Quiz - Vue Basics', dueAt: '2018-06-12', isComplete: false, priority: { id: 1, name: 'low', order: 1 } },
      { id: 10, title: 'Midterm Project 2', dueAt: '2018-05-28', isComplete: false, priority: { id: 1, name: 'low', order: 1 } }
    ]
  }),
  filters: {
    // see Vue docs https://vuejs.org/v2/guide/filters.html
    prioritySymbol (priority) {
      // In this case we will apply a simple js string repeat function
      // to give us the number of exclamation points cooresponding to
      // the priority.order value.
      return '!'.repeat(priority.order)
    }
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
  margin-top: 60px;
}
.task-list {
  margin: 2rem;
}
.task-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
}
</style>
