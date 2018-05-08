<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <router-link class="navbar-brand" to="/">Home</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse mt-2 mt-md-0">
      <ul class="navbar-nav mr-auto" v-if="this.username">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
            Hi {{this.username}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link class="dropdown-item" :to="{name:'UserInfo',params:{id:this.id,token:this.token}}">Profile
            </router-link>
            <router-link class="dropdown-item" :to="{name:''}">My Bid</router-link>
            <router-link class="dropdown-item" :to="{name:'UserAuction',params:{id:this.id,token:this.token,seller:true}}">My Auction
              Items
            </router-link>
            <button class="dropdown-item" @click="logout">Log Out</button>
          </div>
        </li>
      </ul>
      <form class="form-inline mt-2 mt-md-0" v-if="!this.username">
        <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#Login">
          Login
        </button>
        <Login v-on:loginMethod="userInfo"/>

        <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#SignIn">
          Sign In
        </button>
        <SignIn v-on:signIn="userInfo"/>
      </form>
    </div>
  </nav>


</template>

<script>
  import Login from './Login'
  import SignIn from './SignIn'
  import CONFIG from '../CONFIG'

  export default {
    name: "Navbar",
    beforeMount() {
      this.username = window.sessionStorage.username;
      this.token = window.sessionStorage.token;
      this.id = window.sessionStorage.id;
    },
    data() {
      return {
        username: '',
        token: '',
        id: ''
      }
    },
    components: {
      Login,
      SignIn
    },
    methods: {
      logout: function () {
        axios({
          method: 'post',
          url: `${CONFIG.URL}/users/logout`,
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
          }
        }).then((response) => {
          this.results = response;
        })
          .catch((err) => {
            this.errorMessage = err
          });
      },
      userInfo: function (response) {
        this.username = window.sessionStorage.username = response.username;
        this.token = window.sessionStorage.token = response.token;
        this.id = window.sessionStorage.id = response.id
      }
    }
  }
</script>

<style scoped>

</style>
