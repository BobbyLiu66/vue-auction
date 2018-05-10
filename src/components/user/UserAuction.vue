<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-if="message" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
          <span>{{message}}</span>
        </div>
      </div>
      <div class="col-12 text-center">
        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#Create">
          Create Auction
        </button>
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

                <div v-if="createMessage" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
                  <span>{{createMessage}}</span>
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
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="createAuction">Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
      <AuctionList :auctionDetail="auctions"/>
    </div>
  </div>
</template>

<script>
  import AuctionList from '@/components/auction/AuctionList'
  import CONFIG from '../../CONFIG'

  export default {
    name: "UserAuction",
    components: {
      AuctionList
    },
    data() {
      return {
        auctions: [],
        message: '',
        categoryId: '',
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        reservePrice: '',
        startingBid: '',
        createMessage:''
      }
    },

    computed: {
      auctionDetail: {
        get: function () {
          return this.auctions
        },
        set: function (response) {
          this.auctions = response
        }
      }
    },
    watch: {
      '$route'() {
        this.getDate()
      }
    },
    methods: {
      getDate: function () {
        let url = `${CONFIG.URL}/auctions`;
        if (this.$route.params.type === 'seller') {
          url += `?seller=${this.$route.params.id}`
        }
        if (this.$route.params.type === 'winner') {
          url += `?winner=${this.$route.params.id}`
        }
        if (this.$route.params.type === 'bidder') {
          url += `?bidder=${this.$route.params.id}`
        }
        axios({
          method: 'get',
          url: url,
        }).then((response) => {
          if (response.data.length === 0) {
            this.message = 'No result';
            this.auctionDetail = []
          }
          else {
            this.message = '';
            const timeLine = new Date();
            let closedFlag = true;
            let processFlag = true;
            response.data.forEach((data) => {
              const dataTime = new Date(data.endDateTime);
              if (dataTime < timeLine && closedFlag) {
                data.additional = 'Closed';
                closedFlag = false
              }
              else if (processFlag) {
                data.additional = 'In process';
                processFlag = false
              }
            });
            this.auctionDetail = response.data
          }
        }).catch((err) => {
          this.message = err
        });
      },


      createAuction: function () {
        if(this.validateDateTime()){
          axios({
            method: 'post',
            url: `${CONFIG.URL}/auctions`,
            headers: {
              'X-Authorization': this.$store.token
            },
            data:{
              "categoryId": parseInt(this.categoryId),
              "title": this.title,
              "description": this.description,
              "startDateTime": (new Date(this.startDateTime)).getTime(),
              "endDateTime": (new Date(this.endDateTime)).getTime(),
              "reservePrice": parseInt(this.reservePrice),
              "startingBid": parseInt(this.startingBid)
            }
          }).then(() => {
            this.message = "create auction success";
            $('#Create').modal('hide');
            this.getDate()
          }).catch((err) => {
            this.message = err
          });
        }
        else {
          this.createMessage = "Start Date Time or End Date Time is illegal"
        }
      },
      validateDateTime: function () {
        return !(new Date(this.endDateTime) < new Date(this.startDateTime) || new Date(this.startDateTime) < new Date());
      }
    },
    created() {
      this.getDate()
    }
  }
</script>

<style scoped>

</style>
