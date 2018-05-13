<template>
  <div class="modal fade fade bd-example-modal-lg" id="SignIn" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Please Sign In Here</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div v-if="message" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
            <span>{{message}}</span>
          </div>

          <form @submit="signIn">
            <label for="signInUsername" class="col-form-label">Username: </label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" id="signInUsername" placeholder="Enter username"
                     v-model="username"
                     required>
            </div>

            <label for="inputGivenName">Given name: </label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" id="inputGivenName" placeholder="Enter given name"
                     v-model="givenName"
                     required>
            </div>

            <label for="inputFamilyName">Family name: </label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" id="inputFamilyName" placeholder="Enter family name"
                     v-model="familyName"
                     required>
            </div>

            <label for="signInEmailAddress" class="col-form-label">Email address: </label>
            <div class="input-group mb-3">
              <input type="email" class="form-control" id="signInEmailAddress" placeholder="Enter email address"
                     v-model="email"
                     required>
            </div>
            <label for="singInPassword" class="col-form-label">Password: </label>
            <div class="input-group mb-3">

              <input type="password" class="form-control" id="singInPassword" placeholder="Enter password"
                     v-model="password"
                     required>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from '../../CONFIG'

  export default {
    props: ['sign'],
    data() {
      return {
        results: '',
        username: '',
        givenName: '',
        familyName: '',
        email: '',
        password: '',
        message: ''
      }
    },

    methods: {

      signIn() {
        axios({
          method: 'post',
          url: `${CONFIG.URL}/users`,
          data: {
            username: this.username,
            givenName: this.givenName,
            familyName: this.familyName,
            email: this.email,
            password: this.password,
          }
        }).then(() => {
          axios({
            method: 'post',
            url: `${CONFIG.URL}/users/login`,
            data: {
              username: this.username,
              password: this.password
            }
          }).then((response) => {
            this.$emit('signIn', {token: response.data.token, username: this.username, id: response.data.id});
            $('#SignIn').modal('hide')
          }).catch((err) => {
            this.message = err
          })
        }).catch((err) => {
          this.message = err
        });
      }
    },
    name: "SignIn"
  }
</script>

<style scoped>
  .login-page {
    width: 100%;
    max-width: 40%;
    padding: 15px;
    margin: 0 auto;
  }
</style>
