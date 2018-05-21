<template>
  <div class="modal fade fade bd-example-modal-lg" id="Modify" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" v-if="result.length !== 0">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modify Your Auction Here</h5>
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
                   v-model="result.categoryId"
                   required>
          </div>
          <label for="title" class="col-form-label">Title:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="title" placeholder="Enter Title."
                   v-model="result.title"
                   required>
          </div>
          <label for="description" class="col-form-label">Description:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="description" placeholder="Enter Description."
                   v-model="result.description"
                   required>
          </div>
          <label for="reservePrice" class="col-form-label">Reserve Price:</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" id="reservePrice" placeholder="Enter Reserve Price."
                   v-model="result.reservePrice"
                   required>
          </div>
          <label for="startingBid" class="col-form-label">Starting Bid:</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" id="startingBid" placeholder="Enter Starting Bid."
                   v-model="result.startingBid"
                   required>
          </div>
          <label for="startDateTime" class="col-form-label">Start Date Time:</label>
          <div class="input-group mb-3 date">
            <input type="date" class="form-control" id="startDateTime" placeholder="Enter Start Date Time."
                   v-model="result.startTime"
                   required>
          </div>
          <label for="endDateTime" class="col-form-label">End Date Time:</label>
          <div class="input-group mb-3 date">
            <input type="date" class="form-control" id="endDateTime" placeholder="Enter End Date Time."
                   v-model="result.endTime"
                   required>
          </div>

          <div class="custom-control custom-radio">
            <input type="radio" id="changePhoto" value="change"
                   class="custom-control-input" v-model="photoState">
            <label class="custom-control-label" for="changePhoto">Change Photo</label>
          </div>

          <label for="photo" class="col-form-label" v-if="photoState === 'change'">Photo:</label>
          <div class="input-group mb-3" v-if="photoState === 'change'">
            <div class="custom-file">
              <input type="file" accept="image/png,image/jpeg" class="form-control" id="photo"
                     placeholder="Choose photo" @change="onPhotoChanged">
            </div>
          </div>

          <div class="custom-control custom-radio">
            <input type="radio" id="deletePhoto" value="delete"
                   class="custom-control-input" v-model="photoState">
            <label class="custom-control-label" for="deletePhoto">Delete Photo</label>
          </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="change">Modify</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from '../../CONFIG'

  export default {
    name: "AuctionModify",
    props: ['modify'],
    computed: {
      result() {
        return Object.assign({}, this.modify)
      }
    },
    data() {
      return {
        photo: '',
        photoState: '',
        message: ''
      }
    },
    methods: {
      change(event) {
        event.preventDefault();
        if (this.validateDateTime()) {
          axios({
            method: 'patch',
            url: `${CONFIG.URL}/auctions/${this.$route.params.id}`,
            headers: {
              'X-Authorization': window.sessionStorage.token
            },
            data: {
              "categoryId": parseInt(this.result.categoryId),
              "title": this.result.title,
              "description": this.result.description,
              "startDateTime": (new Date(this.result.startDateTime)).getTime(),
              "endDateTime": (new Date(this.result.endDateTime)).getTime(),
              "reservePrice": parseInt(this.result.reservePrice),
              "startingBid": parseInt(this.result.startingBid)
            }
          }).then(()=>{
            if (this.photoState === 'change' && this.photo) {
              axios({
                method: 'post',
                url: `${CONFIG.URL}/auctions/${this.$route.params.id}/photos`,
                headers: {
                  'X-Authorization': window.sessionStorage.token,
                  'Content-Type': `image/png`
                },
                data: this.photo
              }).then(() => {
                this.$emit('modifyAuction');
                $('#Modify').modal('hide');
              }).catch((err) => {
                this.message = 'something wrong'
              });
            }

            else if (this.photoState === 'delete') {
              axios({
                method: 'delete',
                url: `${CONFIG.URL}/auctions/${this.$route.params.id}/photos`,
                headers: {
                  'X-Authorization': window.sessionStorage.token,
                }
              }).then(() => {
                this.$emit('modifyAuction');
                $('#Modify').modal('hide');
              }).catch((err) => {
                this.message = 'something wrong'
              });
            }

            else {
              this.$emit('modifyAuction');
              $('#Modify').modal('hide');
            }
          }).catch((err) => {
            this.message = 'something wrong'
          });

        }
        else {
          this.message = "Start Date Time or End Date Time is illegal"
        }
      },

      validateDateTime() {
        return !(new Date(this.result.endDateTime) < new Date(this.result.startDateTime) || new Date(this.startDateTime) < new Date());
      },

      onPhotoChanged(event) {
        this.photo = event.target.files[0];
        this.fileType = /[^.]+$/.exec(event.target.files[0].name)[0];
      },
    }
  }
</script>

<style scoped>

</style>
