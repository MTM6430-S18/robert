<template>
  <form class="new-task-form" @submit.prevent="addTask">
    <label>
      Title
      <input v-model.trim="newTask.title" type="text">
    </label>
    <label>
      Due At
      <input v-model="newTask.dueAt" type="date">
    </label>
    <label>
      Priority
      <select v-model="newTask.priority">
        <option
          v-for="option in priorities"
          :key="option.id"
          :value="option.id"
        >{{option.name}}</option>
      </select>
    </label>
    <label>
      Category
      <select v-model="newTask.category">
        <option value="">Uncategorized</option>
        <option
          v-for="option in categories"
          :key="option.id"
          :value="option.id"
        >{{option.name}}</option>
      </select>
    </label>
    <button type="submit">Add Task</button>
  </form>
</template>

<script>
export default {
  name: 'new-task-form',
  props: ['priorities', 'categories'],
  data: () => ({
    newTask: {}
  }),

  created () {
    this.resetNewTask()
  },

  methods: {
    addTask () {
      this.$emit('addTask', this.newTask)
      this.resetNewTask()
    },

    resetNewTask () {
      this.newTask = {
        // We will let Firestore set the id automatically
        // id: Date.now(),
        title: '',
        dueAt: (new Date()).toISOString().split('T')[0],
        isComplete: false,
        priority: 'medium',
        category: ''
      }
    }
  }
}
</script>

<style lang="scss">
.new-task-form {
  margin-bottom: 2rem;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  input,
  select {
    background: hsl(0, 0%, 97%);
    border: 1px solid hsl(0, 0%, 93%);
    font-size: 1.1rem;
    padding: 0.4em;
    border-radius: 0.25rem;
  }

  button {
    background: hsl(197, 90%, 43%);
    border: 1px solid hsl(197, 90%, 48%);
    border-radius: 0.25rem;
    padding: 0.5rem 0.5rem;
    color: hsl(0, 0%, 99%);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
    font-size: 1.1rem;
    width: 100%;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
    outline: none;

    &:active {
      box-shadow: none;
      background: hsl(197, 90%, 33%);
      border: 1px solid hsl(197, 90%, 38%);
    }
  }
}
</style>
