<template>
  <div class="modal fade fade bd-example-modal-lg" id="Modify" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
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
                   v-model="modify.categoryId"
                   required>
          </div>
          <label for="title" class="col-form-label">Title:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="title" placeholder="Enter Title."
                   v-model="modify.title"
                   required>
          </div>
          <label for="description" class="col-form-label">Description:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="description" placeholder="Enter Description."
                   v-model="modify.description"
                   required>
          </div>
          <label for="reservePrice" class="col-form-label">Reserve Price:</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" id="reservePrice" placeholder="Enter Reserve Price."
                   v-model="modify.reservePrice"
                   required>
          </div>
          <label for="startingBid" class="col-form-label">Starting Bid:</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" id="startingBid" placeholder="Enter Starting Bid."
                   v-model="modify.startingBid"
                   required>
          </div>
          <label for="startDateTime" class="col-form-label">Start Date Time:</label>
          <div class="input-group mb-3 date">
            <input type="date" class="form-control" id="startDateTime" placeholder="Enter Start Date Time."
                   v-model="modify.startTime"
                   required>
          </div>
          <label for="endDateTime" class="col-form-label">End Date Time:</label>
          <div class="input-group mb-3 date">
            <input type="date" class="form-control" id="endDateTime" placeholder="Enter End Date Time."
                   v-model="modify.endTime"
                   required>
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
  export default {
    name: "AuctionModify",
    props: ['modify'],
    computed: {
      result: function () {
        return this.modify
      }
    },
    data(){
      return{
        message:''
      }
    },
    methods:{
      change: function () {

      }
    }
  }
</script>

<style scoped>

</style>
