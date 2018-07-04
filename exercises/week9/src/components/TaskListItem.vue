<template>
  <div class="task-list-item">
    <font-awesome-icon
      :icon="['far', task.isComplete ? 'check-circle' : 'circle']"
      @click="$emit('toggleDone', task)"
    />
    <span>{{ task.title }}</span>
    <span>{{ task.dueAt }}</span>
    <font-awesome-icon
      :icon="['far', 'trash-alt']"
      @click="$emit('deleteTask', task)"
    />
  </div>
</template>

<script>
export default {
  name: 'task-list-item',
  props: ['task']
}
</script>

<style>
.task-list-item {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr auto auto;
  padding: 0.5rem 1rem;
  align-items: center;
}
</style>
