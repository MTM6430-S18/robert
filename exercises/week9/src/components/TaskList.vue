<template>
  <div>
    <section class="task-list overdue">
      <task-list-item
        v-for="task in overdueTasks"
        :key="task.id"
        :task="task"
        @toggleDone="$emit('toggleDone', task)"
        @deleteTask="$emit('deleteTask', task)"
      />
    </section>
    <section class="task-list">
      <task-list-item
        v-for="task in normalTasks"
        :key="task.id"
        :task="task"
        @toggleDone="$emit('toggleDone', task)"
        @deleteTask="$emit('deleteTask', task)"
      />
    </section>
  </div>
</template>

<script>
import TaskListItem from '@/components/TaskListItem'

export default {
  name: 'task-list',
  components: { TaskListItem },
  props: ['tasks'],
  computed: {
    overdueTasks () {
      return this.tasks.filter(
        task => new Date(task.dueAt) < new Date() && !task.isComplete
      )
    },
    normalTasks () {
      return this.tasks.filter(
        task => new Date(task.dueAt) >= new Date() || task.isComplete
      )
    }
  }
}
</script>

<style>
.overdue {
  border-bottom: 1px solid hsl(348, 83%, 47%);
  background: hsl(348, 33%, 97%);
  color: hsl(348, 18%, 20%);
  margin-bottom: 1rem;
}
.completed {
  border-top: 1px solid green;
  padding-top: 1rem;
  margin-top: 1rem;
}
</style>
