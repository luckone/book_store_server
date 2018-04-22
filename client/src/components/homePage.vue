<template>
    <div class="home-app">
      <div class="container">
        <div class="container-header">
          <div class="user">
            <img src="../../static/u.jpeg" alt="" class="avatar">
            <p class="name">John Doe</p>
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
      profile: {}
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

</style>
