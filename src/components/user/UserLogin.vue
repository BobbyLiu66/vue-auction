<template>
  <div class="modal fade fade bd-example-modal-lg" id="Login" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Please Login Here</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">


          <div v-if="message" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
            <span>{{message}}</span>
          </div>

          <form @submit="login">
          <label for="inputUsername" class="col-form-label">Username/Email:</label>

          <div class="input-group mb-3">
            <input type="text" class="form-control" id="inputUsername" placeholder="Enter username/email"
                   v-model="username"
                   required>

          </div>

          <label for="inputPassword" class="col-form-label">Password:</label>

          <div class="input-group mb-3">
            <input type="password" class="form-control" id="inputPassword" placeholder="Enter password"
                   v-model="password"
                   required>
          </div>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from '../../CONFIG'


  export default {
    props: ['loginMethod'],
    data() {
      return {
        results: '',
        username: '',
        password: '',
        message: ''
      }
    },

    methods: {
      validateEmail: function (email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      login: function () {
        let data = {username: '', email: '', password: this.password};
        if (this.validateEmail(this.username)) {
          data.email = this.username
        }
        else {
          data.username = this.username
        }
        if(!this.username || !this.password){
          this.message = "Input your login information";
          setInterval(()=>{this.message = ''},5 * 1000)
        }
        else {
          axios({
            method: 'post',
            url: `${CONFIG.URL}/users/login`,
            data: data
          }).then((response) => {
            this.$emit('loginMethod', {token: response.data.token, username: this.username, id: response.data.id});
            $('#Login').modal('hide');
          }).catch((err) => {
            this.message = err;
            setInterval(()=>{this.message = ''},5 * 1000)
          });
        }
      }
    },
    name: "Login"
  }
</script>

<style scoped>
</style>
