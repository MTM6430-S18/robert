<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <h1>Axios API Demo</h1>
      <form @submit.prevent="addTask(newTask)">
        <label>
          Title
          <input type="text" v-model="newTask.title">
        </label>
        <button type="submit">Add Task</button>
      </form>
      <h2>Task collection results go here ...</h2>
      <ul>
        <li v-for="task of taskList" :key="task.id" class="task-item">
          <span>{{task.title}}</span>
          <button @click="removeTask(task)">DELETE</button>
        </li>
      </ul>
    </div>
    <login-form v-else @saveApiTokens="saveApiTokens" />
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import LoginForm from '@/components/LoginForm'

export default {
  name: 'app',
  components: { LoginForm },
  data: () => ({
    newTask: {},
    api: {
      accessToken: '',
      expiresAt: ''
    },
    taskList: {},
    users: { // A dictionary object rather than an array
      1: { id: 1, name: 'Tom' },
      2: { id: 2, name: 'Dick' },
      3: { id: 3, name: 'Harry' },
      4: { id: 4, name: 'Joe' }
    }
  }),
  computed: {
    isLoggedIn () {
      return this.api.accessToken && moment(this.api.expiresAt).isAfter()
    },
    axiosOptions () {
      return {
        baseURL: 'https://vue-todos.robertmckenney.ca/api',
        headers: { 'Authorization': `Bearer ${this.api.accessToken}` }
      }
    }
  },
  created () {
    this.resetForm()
    this.loadCachedData()
  },
  methods: {
    resetForm () {
      this.newTask = {
        title: '',
        description: '',
        dueAt: moment().format(),
        priority: 2,
        category: null,
        isComplete: false
      }
    },
    loadCachedData () {
      // we will build this out next week
    },

    // This method is called when the LoginForm emits the saveApiTokens event
    saveApiTokens (apiTokens) {
      this.api.accessToken = apiTokens.access_token
      this.api.expiresAt = apiTokens.expires_at
      localStorage.setItem('todoApiTokens', JSON.stringify(apiTokens))
      // We just logged-in a new user. We better refresh our task list.
      this.refreshTasks()
    },

    refreshTasks () {
      axios.get('/tasks', this.axiosOptions)
        // we can destructure the response object to get the nested data payload
        .then(({data: {data}}) => {
          // Assign the array of tasks from the API response payload
          // this.taskList = data

          // This version transforms the array into a dictionary object with
          // the task.id as the keys
          this.taskList = Object.assign({}, ...data.map(t => ({ [t.id]: t })))
        })
        .catch(error => this.handleAPIErrors(error))
    },

    addTask (task) {
      axios.post('/tasks', task, this.axiosOptions)
        // when destructuring, we can also assign a different name (e.g. "t")
        .then(({data: {data: t}}) => {
          // We would expect to be able to simply add the new object property
          // and value, like this ...
          // this.taskList[t.id] = t

          // However, Vue is not able to correctly observe this action, and
          // the values of our task properties (e.g. title, dueAt, etc) will
          // not be reactive when edited. See https://vuejs.org/v2/api/#Vue-set
          // So, we need to use Vue's special $set() method ...
          this.$set(this.taskList, t.id, t)
          this.resetForm()
        })
        .catch(error => this.handleAPIErrors(error))
    },

    removeTask (task) {
      axios.delete(`/todos/${task.id}`, this.axiosOptions)
        .then(response => {
          // We would expect to be able to simply delete the object property
          // cooresponding to our dictionary key, like this ...
          // delete this.taskList[task.id]

          // However, Vue is not able to directly observe this action, and
          // we will not see the reactivity system update our list.
          // So, we need to use a special $delete() method on our Vue
          // component instance ...
          this.$delete(this.taskList, task.id)
        })
        .catch(error => this.handleAPIErrors(error))
    },

    // These are leftover methods from last week's exercise. But you can use
    // as guides to how to update your todo app methods.

    // Retrive collection of objects
    fetchUsers () {
      axios
        .get(`${this.baseUrl}/users`)
        .then(response => {
          // The response object has several properties:
          // { config, headers, data, request, status, statusText }
          // Our requested payload is in the "data" key, and for this
          // resource request it will be an array of user objects.
          // this.users = response.data

          // We need to do this differently if this.users is a
          // dictionary object rather than an array ...
          // [see](https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7)
          this.users = Object.assign({}, ...response.data.map(user => ({[user.id]: user})))
        })
        .catch(error => this.handleAPIErrors(error))
    },

    // Retrive a single object
    getUser (id) {
      axios
        .get(`${this.baseUrl}/users/${id}`)
        .then(response => console.log(response.data))
        .catch(error => this.handleAPIErrors(error))
    },

    // Create a new object
    createUser (newUser) {
      //  validation
      // this.users.push(newUser)
      // this.newUser = { name: '' }
      axios
        .post(`${this.baseUrl}/users`, newUser)
        // We can use object destructuring to get the data property
        .then(({ data }) => {
          // this.users.push(data)
          this.users[data.id] = data
          this.newUser = { name: '' }
        })
        .catch(error => this.handleAPIErrors(error))
    },

    // Change the properties of an object
    updateUser (user) {
      axios
        .patch(`${this.baseUrl}/users/${user.id}`, user)
        .then(response => {
          // const index = this.users.findIndex(user)
          // this.users.splice(index, 1)
          // this.users.push(result.data)
          this.users[user.id] = response.data
        })
        .catch(error => this.handleAPIErrors(error))
    },

    // Remove an object
    destroyUser (user) {
      axios
        .delete(`${this.baseUrl}/users/${user.id}`)
        .then(response => {
          // const index = this.users.findIndex(user)
          // this.users.splice(index, 1)
          delete this.users[user.id]
        })
        .catch(error => this.handleAPIErrors(error))
    },

    // A common error handler function
    handleAPIErrors (error) {
      // We will make this more robust net week
      console.log(error.message)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  max-width: 550px;
  margin: 60px auto;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.task-item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin: 1rem 0;
}
</style>
