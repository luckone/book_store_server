<template>
 <div class="app-gallery">
   <button @click="addPost">Click me</button>
   <button @click="getAllPosts">get</button>
   <input type="text" placeholder="name" v-model="name">
   <input type="text" placeholder="surname" v-model="surname">
   <input type="text" placeholder="login" v-model="login">
   <input type="password" placeholder="password" v-model="password">
   <button @click="createUser">Submit</button>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: '',
      surname: '',
      login: '',
      password: ''
    }
  },
  methods: {
    getAllPosts () {
      this.$http.post('posts/list').then(data => {
        console.log(data)
      })
    },
    addPost () {
      this.$http.post('posts/add', {
        title: "asdkljasdlkjasldkjaslkdjaslkdjasld"
      }).catch(ex => {
        console.log(ex)
      })
    },
    createUser () {
      this.$http.post('login/create', {
        name: this.name,
        surname: this.surname,
        login: this.login,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
