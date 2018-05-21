<template>

  <div>
    <h5>Shop by Category</h5>
    <div class="custom-control custom-radio">
      <input type="radio" @change="categorySearch" id="allCategory" value=""
             class="custom-control-input" v-model="radioCategory">
      <label class="custom-control-label" for="allCategory">All</label>
    </div>
    <div v-for="category in categories">
      <div class="custom-control custom-radio">
        <input type="radio" @change="categorySearch" v-bind:id="category.categoryId" v-bind:value="category.categoryId"
               class="custom-control-input" v-model="radioCategory">
        <label class="custom-control-label" v-bind:for="category.categoryId">{{category.categoryTitle}}</label>
      </div>
    </div>
    <div class="link"><a href="#" @click="displayed">Advanced search</a></div>
    <form v-if="display">
      <h5>Shop based on your choose</h5>
      <div class="form-group">
        <label for="auctionTitle" class="col-form-label">Auction Title:</label>
        <input type="text" class="form-control form-control-sm" id="auctionTitle" placeholder="Enter auction titles."
               v-model="q">
      </div>
      <div class="form-group">
        <label for="categoryId" class="col-form-label">Category:</label>
        <select class="custom-select" id="categoryId" v-model="categoryId">
          <option v-for="category in categories" v-bind:value="category.categoryId" >{{category.categoryTitle}}</option>
        </select>

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
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" id="All" v-model="status" checked value="all">
        <label class="custom-control-label" for="All">All</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" id="Active" v-model="status" value="active">
        <label class="custom-control-label" for="Active">Active</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" id="Expired" v-model="status" value="expired">
        <label class="custom-control-label" for="Expired">Expired</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" id="Won" v-model="status" value="won">
        <label class="custom-control-label" for="Won">Won</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" id="Upcoming" v-model="status" value="upcoming">
        <label class="custom-control-label" for="Upcoming">Upcoming</label>
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
        radioCategory: '',
        display: false,
        q: '',
        categoryId: '',
        seller: '',
        bidder: '',
        winner: '',
        status: '',
        categories: []
      }
    },
    beforeMount() {
      axios({
        method: 'get',
        url: `${CONFIG.URL}/categories`,
      }).then((response) => {
        this.categories = response.data
      }).catch((err) => {
        this.message = 'something wrong'
      });
    },
    methods: {
      search() {
        axios({
          method: 'get',
          url: `${CONFIG.URL}/auctions?status=${this.status}&q=${this.q}&category-id=${this.categoryId}&seller=${this.seller}&winner=${this.winner}&bidder=${this.bidder}`,
          headers: {
            'X-Authorization': window.sessionStorage.token
          },
        }).then((response) => {
          this.$emit('search', response.data);
        }).catch((err) => {
          this.$emit('search', err);
        });
      },
      displayed() {
        this.display = !this.display
      },
      categorySearch() {
        this.$emit('categorySearch', this.radioCategory);
      }
    },

  }

</script>

<style scoped>
  .link {
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>
