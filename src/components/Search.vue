<template>
  <form>
    <div class="form-group">
      <label for="startIndex" class="col-form-label">Start Index:</label>
      <input type="number" class="form-control form-control-sm" id="startIndex"
             placeholder="Enter number of items to skip."
             v-model="startIndex">
    </div>
    <div class="form-group">
      <label for="count" class="col-form-label">Count:</label>
      <input type="number" class="form-control form-control-sm" id="count" placeholder="Enter number of items."
             v-model="count">
    </div>
    <div class="form-group">
      <label for="auctionTitle" class="col-form-label">Auction Title:</label>
      <input type="text" class="form-control form-control-sm" id="auctionTitle" placeholder="Enter auction titles."
             v-model="q">
    </div>
    <div class="form-group">
      <label for="categoryId" class="col-form-label">Category:</label>
      <input type="number" class="form-control form-control-sm" id="categoryId" placeholder="Enter ID for the category."
             v-model="categoryId">
    </div>
    <div class="form-group">
      <label for="seller" class="col-form-label">Seller:</label>
      <input type="number" class="form-control form-control-sm" id="seller" placeholder="Enter seller."
             v-model="seller">
    </div>
    <div class="form-group">
      <label for="bidder" class="col-form-label">Bidder:</label>
      <input type="number" class="form-control form-control-sm" id="bidder" placeholder="Enter bidder."
             v-model="bidder">
    </div>
    <div class="form-group">
      <label for="winner" class="col-form-label">Winner:</label>
      <input type="number" class="form-control form-control-sm" id="winner" placeholder="Enter winner."
             v-model="winner">
    </div>
    <div class="form-group text-center">
      <button type="button" class="btn btn-primary" @click="search">Search</button>
    </div>
  </form>
</template>

<script>
  import CONFIG from '../CONFIG'

  export default {
    name: "Search",
    data() {
      return {
        startIndex: '',
        count: '',
        q: '',
        categoryId: '',
        seller: '',
        bidder: '',
        winner: '',
      }
    },
    methods: {
      search: function () {
        axios({
          method: 'get',
          url: `${CONFIG.URL}/auctions?startIndex=${this.startIndex}&count=${this.count}&q=${this.q}&category-id=${this.categoryId}&seller=${this.seller}&winner=${this.winner}&bidder=${this.bidder}`,
          headers: {
            'X-Authorization': window.sessionStorage.token
          },
        }).then((response) => {
          this.$emit('search', response.data);
        }).catch((err) => {
          this.message = err
        });
      }
    },

  }

</script>

<style scoped>

</style>
