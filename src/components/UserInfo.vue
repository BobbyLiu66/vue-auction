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
    <ModifyUser :modify="userInfo"></ModifyUser>
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
    // methods: {
    //   modify: function () {
    //     this.modifyInfo = this.userInfo
    //   }
    // },
    beforeCreate() {
      axios({
        method: 'get',
        url: `${CONFIG.URL}/users/${this.$route.params.id}`,
        headers: {
          'X-Authorization': this.$route.params.token
        }
      }).then((response) => {
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
