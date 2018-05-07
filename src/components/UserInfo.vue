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
      <tr>
        <th scope="row">email address:</th>
        <td>{{this.userInfo.email}}</td>
      </tr>
      <tr>
        <th scope="row">account balance:</th>
        <td>NZD{{this.userInfo.accountBalance}}</td>
      </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#Modify">
      Change your information
    </button>
    <ModifyUser :modify="userInfo" v-on="updateUserInfo"></ModifyUser>
  </div>
</template>

<script>
  import ModifyUser from './ModifyUser'
  import CONFIG from '../CONFIG'

  export default {
    name: "UserInfo",
    data() {
      return {
        userInfo: {},
      }
    },
    computed:{
      updateUserInfo:function (response) {
        this.userInfo = response
      }
    },
    beforeCreate() {
      axios({
        method: 'get',
        url: `${CONFIG.URL}/users/${this.$route.params.id}`,
        headers: {
          'X-Authorization': this.$route.params.token
        }
      }).then((response) => {
        response.data.id = this.$route.params.id;
        response.data.token = this.$route.params.token;
        this.userInfo = response.data
      }).catch((err) => {
        this.errorMessage = err
      });
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
