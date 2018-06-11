<template>
  <div v-if="isEditing" class="task-list-item is-editing">
    <font-awesome-icon
      :icon="statusIcon"
      @click="$emit('toggleDone', task)"
    />
    <form>
      <label>
        Title
        <input v-model.trim="task.title" type="text">
      </label>
      <label>
        Due at
        <input v-model="task.dueAt" type="date">
      </label>
      <button @click="cancel">Cancel</button>
      <button @click="save">Save</button>
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
    isEditing: false
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
      this.isEditing = true
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
}
</style>
