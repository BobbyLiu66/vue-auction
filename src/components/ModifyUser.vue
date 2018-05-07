<template>
  <div class="modal fade fade bd-example-modal-lg" id="Modify" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Change Your Information</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <form>
            <div v-if="errorMessage" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
              <span>{{errorMessage}}</span>
            </div>
            <div class="form-group">
              <label for="signInUsername" class="col-form-label">Username:</label>
              <input type="text" class="form-control" id="signInUsername" placeholder="Enter username"
                     v-model="username"
                     required>
            </div>
            <div class="form-group">
              <label for="inputGivenName">Given name:</label>
              <input type="text" class="form-control" id="inputGivenName" placeholder="Enter given name"
                     v-model="givenName"
                     required>
            </div>
            <div class="form-group">
              <label for="inputFamilyName">Family name:</label>
              <input type="text" class="form-control" id="inputFamilyName" placeholder="Enter family name"
                     v-model="familyName"
                     required>
            </div>
            <div class="form-group">
              <label for="signInEmailAddress" class="col-form-label">Email address:</label>
              <input type="email" class="form-control" id="signInEmailAddress" placeholder="Enter email address"
                     v-model="email"
                     required>
            </div>
            <div class="form-group">
              <label for="singInPassword" class="col-form-label">Password:</label>
              <input type="password" class="form-control" id="singInPassword" placeholder="Enter password"
                     v-model="password"
                     required>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="change">Change</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from '../CONFIG'

  export default {
    data() {
      return {
        results: '',
        username: this.$router.params.username,
        givenName: this.$router.params.givenName,
        familyName: this.$router.params.familyName,
        email: this.$router.params.email,
        password: this.$router.params.password,
        errorMessage: ''
      }
    },
    methods: {
      signIn: function (event) {
        axios({
          method: 'patch',
          url: `${CONFIG.URL}/users/login`,
          data: {
            username: this.username,
            givenName: this.givenName,
            familyName: this.familyName,
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
    },
    name: "ModifyUser"
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
