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
            <div v-if="message" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
              <span>{{message}}</span>
            </div>
            <div class="form-group">
              <label for="username" class="col-form-label">Username:</label>
              <input type="text" class="form-control" id="username" placeholder="Enter username"
                     v-model="modifyInfo.username"

                     required>
            </div>
            <div class="form-group">
              <label for="givenName">Given name:</label>
              <input type="text" class="form-control" id="givenName" placeholder="Enter given name"
                     v-model="modifyInfo.givenName"
                     required>
            </div>
            <div class="form-group">
              <label for="familyName">Family name:</label>
              <input type="text" class="form-control" id="familyName" placeholder="Enter family name"
                     v-model="modifyInfo.familyName"
                     required>
            </div>
            <div class="form-group">
              <label for="email" class="col-form-label">Email address:</label>
              <input type="email" class="form-control" id="email" placeholder="Enter email address"
                     v-model="modifyInfo.email"
                     required>
            </div>
            <div class="form-group">
              <label for="password" class="col-form-label">Password:</label>
              <input type="password" class="form-control" id="password" placeholder="Enter password"
                     v-model="modifyInfo.password"
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
  import CONFIG from '../../CONFIG'

  export default {
    props: ['modify'],
    computed: {
      modifyInfo() {
        return Object.assign({}, this.modify);
      }
    },
    data() {
      return {
        results: '',
        password: '',
        message: ''
      }
    },
    methods: {
      change(event) {
        event.preventDefault();
        axios({
          method: 'patch',
          url: `${CONFIG.URL}/users/${this.modifyInfo.id}`,
          headers: {
            'X-Authorization': this.modifyInfo.token
          },
          data: {
            username: this.modifyInfo.username,
            givenName: this.modifyInfo.givenName,
            familyName: this.modifyInfo.familyName,
            email: this.modifyInfo.email,
            password: this.password,
          }
        }).then(() => {
          this.$emit('modified', this.modifyInfo);
          this.message = "change information success";
          setTimeout(() => {
            $('#Modify').modal('hide')
          }, 1000)
        })
          .catch((err) => {
            this.message = 'something wrong'
          });
      }
    },
    name: "ModifyUser"
  }
</script>

<style scoped>
</style>
