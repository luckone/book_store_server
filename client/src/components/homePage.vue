<template>
    <div class="home-app">
      <div class="container">
        <div class="modal" @click="modal = false" v-if="modal">
          <div class="modal__wrapper">
            <img :src="profile.avatar" alt="">
          </div>
        </div>
        <div class="container-header">
          <div class="user">
            <img :src="profile.avatar" alt="" class="avatar" @click="modal = true">
            <p class="name">{{profile.name}} {{profile.surname}} <button @click="logOut">Log out</button></p>
          </div>
          <button class="btn-create">Create Post</button>
        </div>
        <div class="container-content">
          <div class="masonry">
            <div class="masonry-item" v-for="item in 16">
              <img src="../../static/i.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'home-page',
  data () {
    return {
      profile: {},
      modal: false
    }
  },
  mounted () {
    console.log(this.$cookie.get('token'))
    this.$http.post('get-me', {
      access_token: this.$cookie.get('token')
    }).then(data => {
      if (data.body.status === true) {
        this.profile = data.body.profile
      }
    }).catch(ex => {
      console.log(ex)
    })
  },
  methods: {
    logOut () {
      this.$cookie.delete('token')
      this.$router.push('/')
    }
  }
}
</script>

<style>

  .home-app {
    overflow-x: hidden;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    background: url('../../static/restaurant.png');
    min-height: 100vh;
  }

  .container {
    width: 70%;
    min-height: 100vh;
    background: #fff;
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.12);

  }

  .container-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: scale(1.05);
    border-radius: 0 8px 8px   8px;
    box-shadow: 0 1px 30px 0 rgba(0,0,0,0.12);
    color: #fff;
    padding: 20px;
    max-height: 80px;
    background-color: #4d94c8;
    /*background: url('../../static/restaurant.png');*/
  }

  .user {
    display: flex;
    align-items: center;
    font-weight: 700;
    cursor: pointer;
  }

  .avatar {
    margin-right: 15px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
  }

  .btn-create {
    border: none;
    display: inline-block;
    outline: none;
    cursor: pointer;
    background-color: #4d94c8;
    border: 2px solid #fff;
    color: #fff;
    font-weight: 700;
    transition: all .3s ease-in-out;
    border-radius: 7px;
    padding: 15px 20px;
    min-width: 170px;
    min-height: 40px;
  }

  .btn-create:hover {
    background-color: #fff;
    color: #94c9d3;
  }

  .masonry {
      column-count: 3;
      column-gap: 1em;
      padding: 20px;
  }

  .masonry-item {
      display: inline-block;
      margin: 1em 0 0;
  }

  .masonry-item > img {
    width: 100%;
    min-width: 80px;
    min-height: 80px;
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.7);
    z-index: 999999;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    font-weight: bold;
    color: #fff;
  }

  .modal__wrapper {
    animation: zoom .5s ease-in-out;
  }

  @keyframes zoom {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
