<template>
  <div class="modal fade fade bd-example-modal-lg" id="Login" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
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
              <label for="inputUsername" class="col-form-label">Username:</label>
              <input type="text" class="form-control" id="inputUsername" placeholder="Enter username" v-model="username"
                     required>
            </div>
            <div class="form-group">
              <label for="inputEmailAddress" class="col-form-label">Email address:</label>
              <input type="email" class="form-control" id="inputEmailAddress" placeholder="Enter email address"
                     v-model="email"
                     required>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="col-form-label">Password:</label>
              <input type="password" class="form-control" id="inputPassword" placeholder="Enter password"
                     v-model="password"
                     required>
            </div>
            <!--<button type="submit" class="btn btn-primary" @click.prevent="signIn">Login</button>-->
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
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
        username: '',
        email: '',
        password: '',
        errorMessage: ''
      }
    },

    methods: {
      signIn: function (event) {
        axios({
          method: 'post',
          url: `${CONFIG.URL}/users/login`,
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
          }
        }).then((response) => {
          this.results = response;
        }).catch((err) => {
            this.errorMessage = err
        });
      }
    },
    name: "Login"
  }
</script>

<style scoped>
</style>
