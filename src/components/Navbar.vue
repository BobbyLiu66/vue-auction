<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <router-link class="navbar-brand" to="/home">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              USERNAME
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/user/info">Profile</router-link>
              <router-link class="dropdown-item" to="/auction">My Auction Bid</router-link>
              <router-link class="dropdown-item" to="/auction">My Auction Items</router-link>
              <button class="dropdown-item" @click="logout">Log Out</button>
            </div>
          </li>
        </ul>
        <form class="form-inline mt-2 mt-md-0">
        <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#Login">
        Login
        </button>
        <Login/>

        <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#SignIn">
        Sign In
        </button>
        <SignIn/>
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
    components: {
      Login,
      SignIn
    },
    methods:{
      logout:function () {
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
      }
    }
  }
</script>

<style scoped>

</style>
