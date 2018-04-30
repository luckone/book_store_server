<template>
<div class="auth-app">

  <transition name="slide-fade">
  <div class="auth-block" v-show="signUpView">
    <div class="auth-inner">
      <h2 style="color: #26ae90">Hi there!</h2>
      <input type="text" placeholder="login" v-model="log">
      <input type="password" placeholder="password"v-model="pw">
      <button class="btn" @click="signIn">Submit</button>
      <p v-show="error" class="error">User not found :(</p>
    </div>
    <div class="auth-footer">
      <p class="action-link" @click="signUpView = false">Have no account? Sign up!</p>
    </div>
  </div>
  </transition>

  <transition name="slide-fade">
    <div class="auth-block" v-show="!signUpView">
      <div class="auth-inner">
        <h2 style="color: #26ae90">Sign up</h2>
        <input type="file" @change="onAvatarChange">
        <input type="text" placeholder="login" v-model="login">
        <input type="password" placeholder="password" v-model="password">
        <input type="text" placeholder="name" v-model="name">
        <input type="text" placeholder="surname" v-model="surname">
        <button class="btn" @click="createUser">Submit</button>
      </div>
      <div class="auth-footer">
        <p class="action-link" @click="signUpView = true">Sign in</p>
      </div>
    </div>
  </transition>

</div>
</template>

<script>
  export default {
    name: 'auth',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        signUpView: true,
        error: false,
        name: '',
        avatar: '',
        surname: '',
        login: '',
        password: '',
        log: '',
        pw: ''
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
        if(this.login !== ''
          && this.password !== ''
          && this.name !== ''
          && this.surname !== '') {
          let formD = new FormData
          formD.append('avatar', this.avatar)
          formD.append('name', this.name)
          formD.append('surname', this.surname)
          formD.append('login', this.login)
          formD.append('password', this.password)
          this.$http.post('login/create', formD).then(data => {
            if(data.body.status === true) {
              this.$router.push('/home')
            }
          }).catch(ex => {
            console.log(ex)
          })
        } else alert('missed required params')
      },
      signIn () {
        this.$http.post('login', {
          login: this.log,
          password: this.pw
        }).then(data => {
          if (data.body.status === true) {
            this.$cookie.set('token', data.body.access_token)
            this.$router.push('/home')
          } else {
            this.log = ''
            this.pw = ''
            this.error = true
          }
        }).catch(ex => {
          console.log(ex)
        })
      },
      onAvatarChange (e) {
        e.preventDefault();
        //this.uploadCroppedImage();
        console.log(e)
        this.avatar = e.target.files[0];
        console.log(this.avatar)
        // var files = e.target.files || e.dataTransfer.files;
        // console.log(this.avatar);
        // if (!files.length)
        //   return;
        this.createImage(this.avatar);
      },
      createImage (file) {
        console.log(file);
        return new Promise((resolve, reject) => {
          const image = new Image();
          const reader = new FileReader();
          const vm = this;

          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.onerror = (ev) => {
            reject(ev);
          };
          console.log(reader.readAsDataURL(file));
        })
      },
    }
  }
</script>

<style>
  .auth-app {
    overflow: hidden;
    background: url('../../static/restaurant.png');
    width: 100%;
    min-height: 100vh;
  }

  .auth-block {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 600px;
    margin: 40px auto;
    background-color: rgba(255,255,255,.9);
    display: flex;
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.12);
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
  }

  .auth-inner {
    width: 100%;
    padding: 60px;
    text-align: center;
  }

  .auth-inner > input {
    margin: 20px 0;
    height: 30px;
    width: 100%;
    display: block;
    /*border-radius: 3px;*/
    outline: none;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #E1E1E1;
    padding: 5px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.1rem;
    color: #777;
    transition: all .3s ease-in-out;
  }

  .auth-inner > input:focus {
    border-bottom: 1px solid #26ae90;
  }

  .btn {
    border: none;
    display: inline-block;
    outline: none;
    cursor: pointer;
    background-color: #26ae90;
    color: #fff;
    font-weight: 700;
    transition: all .3s ease-in-out;
    border-radius: 7px;
    margin-top: 15px;
    padding: 15px 20px;
    min-width: 170px;
    min-height: 40px;
  }

  .btn:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.12);
  }

  .action-link {
    color: #26ae90;
    cursor: pointer;
    font-weight: bolder;
    opacity: .7;
    transition: all .3s ease-in-out;
  }

  .action-link:hover {
    transform: scale(1.02);
    opacity: 1;
  }

  .auth-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 1px solid #e1e1e1;
  }

  .error {
    color: #F04F4E;
  }

  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s ease-in-out;
  }
  .slide-fade-enter {
    transform: translateX(-150%);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateX(150%);
    opacity: 0;
  }
</style>
