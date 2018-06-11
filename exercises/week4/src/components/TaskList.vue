<template>
  <div>
    <task-list-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggleDone="toggleDone"
        @deleteTask="deleteTask" />
  </div>
</template>

<script>
import TaskListItem from '@/components/TaskListItem'

export default {
  props: ['tasks'],
  components: { TaskListItem },
  methods: {
    toggleDone (task) {
      this.$emit('toggleDone', task)
    },
    deleteTask (task) {
      this.$emit('deleteTask', task)
    }
  }
}
</script>
