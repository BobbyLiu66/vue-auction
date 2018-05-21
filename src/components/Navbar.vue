<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <router-link class="navbar-brand" to="/">Home</router-link>
    </div>


    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav mr-auto" v-if="this.username">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
            Hi {{this.username}}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link class="dropdown-item" :to="{name:'UserInfo',params:{id:this.id,token:this.token}}">Profile
            </router-link>
            <router-link class="dropdown-item"
                         :to="{name:'UserAuction',params:{id:this.id,token:this.token,bidder:true,type:'bidder'}}">My
              Bid Items
            </router-link>
            <router-link class="dropdown-item"
                         :to="{name:'UserAuction',params:{id:this.id,token:this.token,seller:true,type:'seller'}}">My
              Soled
              Items
            </router-link>
            <router-link class="dropdown-item"
                         :to="{name:'UserAuction',params:{id:this.id,token:this.token,winner:true,type:'winner'}}">My
              Wined
              Items
            </router-link>
            <button class="dropdown-item" @click="logout">Log Out</button>
          </div>
        </li>
      </ul>
      <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#Create"
              v-if="this.username">
        Create Auction
      </button>
      <CreateAuction/>
        <form class="form-inline mt-2 mt-md-0" v-if="!this.username">
          <button type="button" class="btn btn-outline-success " data-toggle="modal" data-target="#Login">
            Login
          </button>
          <Login v-on:loginMethod="userInfo"/>

          <button type="button" class="btn btn-outline-success " data-toggle="modal" data-target="#SignIn">
            Register
          </button>
          <SignIn v-on:signIn="userInfo"/>
        </form>
      </div>
  </nav>


</template>

<script>
  import CreateAuction from './user/UserAuctionCreate'
  import Login from './user/UserLogin'
  import SignIn from './user/UserRegister'
  import CONFIG from '../CONFIG'

  export default {
    name: "Navbar",
    beforeMount() {
      this.username = window.sessionStorage.username;
      this.token = window.sessionStorage.token;
      this.id = window.sessionStorage.userId
    },
    data() {
      return {
        username: '',
        token: '',
        id: '',
        message: ''
      }
    },
    components: {
      Login,
      SignIn,
      CreateAuction
    },
    methods: {
      logout: function () {
        axios({
          method: 'post',
          url: `${CONFIG.URL}/users/logout`,
          headers: {
            'X-Authorization': this.token
          }
        }).then(() => {
          this.username = window.sessionStorage.username = '';
          this.token = window.sessionStorage.token = '';
          this.id = window.sessionStorage.userId = '';
          this.$store.commit('refresh')
        }).catch((err) => {
          this.message = 'something wrong'
        });
      },


      userInfo(response) {
        this.username = window.sessionStorage.username = response.username;
        this.token = window.sessionStorage.token = response.token;
        this.id = window.sessionStorage.userId = response.id;
        this.$store.commit('refresh')
      }
    }
  }
</script>

<style scoped>

</style>
