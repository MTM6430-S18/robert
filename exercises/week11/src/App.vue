<template>
  <div id="app">
    <h1>Axios API Demo</h1>
    <form @submit.prevent="createUser(newUser)">
      <label>
        Name
        <input type="text" v-model="newUser.name">
      </label>
      <button type="submit">Add User</button>
    </form>
    <h2>User collection results go here ...</h2>
    <button @click="fetchUsers">Fetch Users</button>
    <ul>
      <li v-for="user of users" :key="user.id">
        {{user.name}} <button @click="destroyUser(user)">DELETE</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data: () => ({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    newUser: { name: '' },
    // users: [],
    users: { // A dictionary object rather than an array
      1: { id: 1, name: 'Tom' },
      2: { id: 2, name: 'Dick' },
      3: { id: 3, name: 'Harry' },
      4: { id: 4, name: 'Joe' }
    }
  }),
  methods: {
    // Retrive collection of objects
    fetchUsers () {
      axios
        .get(`${this.baseUrl}/users`)
        .then(response => {
          // The response object has several properties:
          // { config, headers, data, request, status, statusText }
          // Our requested payload is in the "data" key, and for this
          // resource request it will be an array of user objects.
          this.users = response.data

          // We need to do this differently if this.users is a
          // dictionary object rather than an array.
          // ...
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
