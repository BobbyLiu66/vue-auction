<template>
  <div class="text-center">
    <table class="table user-info mx-auto">
      <tbody>
      <tr>
        <th scope="row">username:</th>
        <td>Mark</td>
      </tr>
      <tr>
        <th scope="row">family name:</th>
        <td>Jacob</td>
      </tr>
      <tr>
        <th scope="row">given name:</th>
        <td>Larry</td>
      </tr>
      <tr>
        <th scope="row">email address:</th>
        <td>Larry</td>
      </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#Modify">
      Change your information
    </button>
    <ModifyUser></ModifyUser>
  </div>
</template>

<script>
  import ModifyUser from './ModifyUser'

  export default {
    name: "UserInfo",
    components: {
      ModifyUser
    }
  }
</script>

<style scoped>
.user-info{
  max-width: 50%;
}
</style>
