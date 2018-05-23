<template>
  <li class="task-list-item" >
    <span
      class="far" :class="task.isComplete ? 'fa-check-circle' : 'fa-circle'"
      @click="$emit('toggleDone', task)">
    </span>
    <span>{{ task.title }}</span>
    <span>{{ task.dueAt }}</span>
    <span class="far fa-trash-alt" @click="$emit('deleteTask', task)"></span>
  </li>
</template>

<script>
export default {
  props: ['task']
}
</script>

<style>
.task-list-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-gap: 0.5rem;
  align-items: center;
  text-align: left;
}
</style>
