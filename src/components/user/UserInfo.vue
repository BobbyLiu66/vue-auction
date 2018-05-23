<template>
  <div class="text-center">
    <table class="table user-info mx-auto">
      <tbody>
      <tr>
        <th scope="row">username:</th>
        <td>{{this.userInfo.username}}</td>
      </tr>
      <tr>
        <th scope="row">family name:</th>
        <td>{{this.userInfo.familyName}}</td>
      </tr>
      <tr>
        <th scope="row">given name:</th>
        <td>{{this.userInfo.givenName}}</td>
      </tr>
      <tr v-if="this.userInfo.email">
        <th scope="row">email address:</th>
        <td>{{this.userInfo.email}}</td>
      </tr>
      <tr v-if="this.userInfo.email">
        <th scope="row">account balance:</th>
        <td>NZD{{this.userInfo.accountBalance || 0}}</td>
      </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#Modify" v-if="this.userInfo.email">
      Change your information
    </button>
    <ModifyUser :modify="userInfo" v-on:modified="updateUserInfo"></ModifyUser>
  </div>
</template>

<script>
  import ModifyUser from './UserModify'
  import CONFIG from '../../CONFIG'

  export default {
    name: "UserInfo",
    data() {
      return {
        userInfo: {},
      }
    },
    watch: {
      '$route'() {
        this.getData()
      }
    },
    methods: {
      updateUserInfo(res) {
        this.userInfo = res
      },
      getData(){
        axios({
          method: 'get',
          url: `${CONFIG.URL}/users/${this.$route.params.id}`,
          headers: {
            'X-Authorization': window.sessionStorage.token
          }
        }).then((response) => {
          response.data.id = this.$route.params.id;
          response.data.token = window.sessionStorage.token;
          this.userInfo = response.data
        }).catch((err) => {
          this.message = 'Get user information wrong'
        });
      }
    },
    created() {
      this.getData()
    },
    components: {
      ModifyUser
    }
  }
</script>

<style scoped>
  .user-info {
    max-width: 50%;
  }
</style>
