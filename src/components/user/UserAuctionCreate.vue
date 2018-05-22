<template>
  <div class="modal fade fade bd-example-modal-lg" id="Create" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Your Auction Here</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div v-if="message" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
            <span>{{message}}</span>
          </div>

          <label for="categoryId" class="col-form-label">Category Id:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="categoryId" placeholder="Enter Category Id."
                   v-model="categoryId"
                   required>
          </div>
          <label for="title" class="col-form-label">Title:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="title" placeholder="Enter Title."
                   v-model="title"
                   required>
          </div>
          <label for="description" class="col-form-label">Description:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="description" placeholder="Enter Description."
                   v-model="description"
                   required>
          </div>
          <label for="reservePrice" class="col-form-label">Reserve Price:</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" id="reservePrice" placeholder="Enter Reserve Price."
                   v-model="reservePrice"
                   required>
          </div>
          <label for="startingBid" class="col-form-label">Starting Bid:</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" id="startingBid" placeholder="Enter Starting Bid."
                   v-model="startingBid"
                   required>
          </div>
          <label for="startDateTime" class="col-form-label">Start Date Time:</label>
          <div class="input-group mb-3 date">
            <input type="date" class="form-control" id="startDateTime" placeholder="Enter Start Date Time."
                   v-model="startDateTime"
                   required>
          </div>
          <label for="endDateTime" class="col-form-label">End Date Time:</label>
          <div class="input-group mb-3 date">
            <input type="date" class="form-control" id="endDateTime" placeholder="Enter End Date Time."
                   v-model="endDateTime"
                   required>
          </div>

          <label for="categoryId" class="col-form-label">Photo:</label>
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file" accept="image/png,image/jpeg" class="form-control" id="photo"
                     placeholder="Choose photo" @change="onPhotoChanged">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="createAuction">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from '../../CONFIG'

  export default {
    data() {
      return {
        categoryId: '',
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        reservePrice: '',
        startingBid: '',
        photo: '',
        message: ''
      }
    },

    name: "Create",

    methods: {
      createAuction() {
        if (this.validateDateTime()) {
          axios({
            method: 'post',
            url: `${CONFIG.URL}/auctions`,
            headers: {
              'X-Authorization': window.sessionStorage.token
            },
            data: {
              "categoryId": parseInt(this.categoryId),
              "title": this.title,
              "description": this.description,
              "startDateTime": (new Date(this.startDateTime)).getTime(),
              "endDateTime": (new Date(this.endDateTime)).getTime(),
              "reservePrice": parseInt(this.reservePrice),
              "startingBid": parseInt(this.startingBid)
            }
          }).then((response) => {
            axios({
              method: 'post',
              url: `${CONFIG.URL}/auctions/${response.data.id}/photos`,
              headers: {
                'X-Authorization': window.sessionStorage.token,
                'Content-Type': `image/png`
              },
              data: this.photo
            }).then(() => {
              this.message = "create auction success";
              $('#Create').modal('hide');
              this.getDate()
            }).catch((err) => {
              this.message = 'Add photo wrong'
            });
          }).catch((err) => {
            this.message = 'Create auction wrong'
          });
        }
        else {
          this.message = "Start Date Time or End Date Time is illegal"
        }
      },

      validateDateTime() {
        return !(new Date(this.endDateTime) < new Date(this.startDateTime) || new Date(this.startDateTime) < new Date());
      },

      onPhotoChanged(event) {
        this.photo = event.target.files[0];
        // this.fileType = /[^.]+$/.exec(event.target.files[0].name)[0];
      }
    }
  }
</script>

<style scoped>

</style>
