<template>
  <div v-if="isEditing" class="task-list-item is-editing">
    <font-awesome-icon
      :icon="statusIcon"
      @click="$emit('toggleDone', task)"
    />
    <form @submit.prevent="save">
      <label>
        Title
        <input v-model.trim="editingTask.title" type="text">
      </label>
      <label>
        Due at
        <input v-model="editingTask.dueAt" type="date">
      </label>
      <div class="action-buttons">
        <button type="button" class="outline" @click="cancel">Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
    <font-awesome-icon :icon="deleteIcon" @click="$emit('deleteTask', task)" />
  </div>
  <div v-else class="task-list-item" >
    <font-awesome-icon
      :icon="statusIcon"
      @click="$emit('toggleDone', task)"
    />
    <span @click="edit">{{ task.title }}</span>
    <span @click="edit">{{ task.dueAt }}</span>
    <font-awesome-icon :icon="deleteIcon" @click="$emit('deleteTask', task)" />
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCircle from '@fortawesome/fontawesome-free-regular/faCircle'
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle'
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt'

export default {
  components: { FontAwesomeIcon: FontAwesomeIcon },
  props: ['task'],
  data: () => ({
    isEditing: false,
    editingTask: {}
  }),
  computed: {
    statusIcon () {
      return this.task.isComplete ? faCheckCircle : faCircle
    },
    deleteIcon () {
      return faTrashAlt
    }
  },
  methods: {
    edit () {
      this.editingTask = Object.assign({}, this.task)
      this.isEditing = true
    },
    cancel () {
      this.isEditing = false
    },
    save () {
      this.$emit('updateTask', this.editingTask)
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">
.task-list-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-gap: 1rem;
  align-items: center;
  padding: 1rem 0.5rem;
  transition: all 400ms;
}
.is-editing {
  margin: 1rem 0;
  background: hsl(0, 0%, 99%);
  border-radius: 0.25rem;
  box-shadow: 0px 1px 5px 0px hsl(0, 0%, 84%);
  padding-top: 1rem;
  padding-bottom: 1rem;

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  input {
    font-size: 1.1rem;
    background: hsl(0, 0%, 97%);
    border: 1px solid hsl(0, 0%, 93%);
    padding: 0.4rem;
    border-radius: 0.25rem;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1em;
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

    &.outline {
      background: transparent;
      box-shadow: none;
      color: hsl(197, 90%, 43%);
    }

    &:active {
      box-shadow: none;
      background: hsl(197, 90%, 33%);
      border: 1px solid hsl(197, 90%, 38%);
    }
  }
}
</style>
