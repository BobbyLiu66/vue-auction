<template>

  <div>
    <h5>Shop by Category</h5>
    <div v-for="category in categories">

      <div class="custom-control custom-radio">
        <input type="radio" @change="categorySearch" v-bind:id="category.categoryId" name="customRadio" v-bind:value="category.categoryId" class="custom-control-input" v-model="radioCategory">
        <label class="custom-control-label" v-bind:for="category.categoryId">{{category.categoryTitle}}</label>
      </div>
    </div>
    <div class="link"><a href="#" @click="displayed">Advanced search</a></div>
    <form v-if="display">
      <h5>Shop based on your choose</h5>
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
        <input type="number" class="form-control form-control-sm" id="categoryId"
               placeholder="Enter ID for the category."
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
  </div>
</template>

<script>
  import CONFIG from '../../CONFIG'

  export default {
    name: "Search",
    data() {
      return {
        radioCategory:'',
        display: false,
        startIndex: '',
        count: '',
        q: '',
        categoryId: '',
        seller: '',
        bidder: '',
        winner: '',
        categories:[]
      }
    },
    beforeMount() {
      axios({
        method: 'get',
        url: `${CONFIG.URL}/categories`,
      }).then((response) => {
         this.categories = response.data
      }).catch((err) => {
        //TODO
      });
    },
    methods: {
      search: function () {
        axios({
          method: 'get',
          url: `${CONFIG.URL}/auctions?startIndex=${this.startIndex}&count=${this.count}&q=${this.q}&category-id=${this.categoryId}&seller=${this.seller}&winner=${this.winner}&bidder=${this.bidder}&status=active`,
          headers: {
            'X-Authorization': window.sessionStorage.token
          },
        }).then((response) => {
          this.$emit('search', response.data);
        }).catch((err) => {
          //TODO
          this.$emit('search', err);
        });
      },
      displayed(){
        this.display = !this.display
      },
      categorySearch(){
        this.$emit('categorySearch', this.radioCategory);
      }
    },

  }

</script>

<style scoped>
  .link{
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>
