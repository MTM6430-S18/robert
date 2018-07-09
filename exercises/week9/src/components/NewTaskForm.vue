<template>
  <transition name="slide-fade">
    <div v-if="!isEditing" class="new-task-form is-compact">
      <input
        v-model.trim="newTask.title"
        v-on:keyup="isEditing = true"
        type="text"
        placeholder="what's next?"
      >
      <button type="button" disabled>Add Task</button>
    </div>
    <form
      v-else
      class="new-task-form"
      @submit.prevent="addTask"
      @keydown.esc="reset"
    >
      <div class="row">
        <label>
          Title
          <input v-focus v-model.trim="newTask.title" type="text">
        </label>
        <label>
          Due At
          <input v-model="newTask.dueAt" type="date">
        </label>
      </div>
      <div class="row">
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
      </div>
      <label>
        Notes
        <textarea v-model="newTask.description" cols="30" rows="6"></textarea>
      </label>
      <div class="row">
        <button type="button" class="isOutline" @click="reset">Cancel</button>
        <button type="submit">Add Task</button>
      </div>
    </form>
  </transition>
</template>

<script>
export default {
  name: 'new-task-form',
  props: ['priorities', 'categories'],
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  data: () => ({
    newTask: {},
    isEditing: false
  }),
  created () { this.reset() },
  methods: {
    addTask () {
      this.$emit('addTask', this.newTask)
      this.reset()
    },
    reset () {
      this.newTask = {
        title: '',
        dueAt: (new Date()).toISOString().split('T')[0],
        isComplete: false,
        priority: 'medium',
        category: '',
        description: ''
      }
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">
.new-task-form {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: hsl(153, 9%, 96%);
  border-radius: 0.5rem;

  &.is-compact {
    grid-template-columns: 1fr auto;
    button {
      font-size: 0.8rem;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  input,
  select,
  textarea {
    background: hsl(0, 0%, 99.5%);
    border: 1px solid hsl(0, 0%, 93%);
    font-size: 1.1rem;
    padding: 0.4em;
    border-radius: 0.25rem;
  }

  .row {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr;

    @media screen and (min-width: 414px) {
      grid-template-columns: 1fr 1fr;
    }
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

    &.isOutline {
      background: transparent;
      color: hsl(197, 90%, 43%);
      box-shadow: none;
    }

    &:active {
      box-shadow: none;
      background: hsl(197, 90%, 33%);
      border: 1px solid hsl(197, 90%, 38%);
    }

    &:disabled {
      opacity: 0.65;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-0.5rem);
  opacity: 0;
}
</style>
