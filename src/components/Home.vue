<template>
  <div class="container">
    <div class="row">
      <div class="col-3" style="margin-top: 15px">
        <Search v-on:search="getSearch" v-on:categorySearch="getCategoryId"/>
      </div>
      <AuctionList :auctionDetail="auctionDetail" :categorySearch="categorySearch"/>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import AuctionList from '@/components/auction/AuctionList'
  import Search from '@/components/auction/AuctionSearch'
  import CONFIG from '../CONFIG'

  export default {
    name: "Home",
    components: {
      Navbar,
      AuctionList,
      Search
    },
    data() {
      return {
        auctions: [],
        categoryId:''
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
      },
      categorySearch:{
        get: function () {
          return this.categoryId
        },
        set: function (response) {
          this.categoryId = response
        }
      }
    },
    methods: {
      getSearch(result) {
        this.auctionDetail = result
      },
      getCategoryId(result) {
        this.categorySearch = result
      }
    },
    beforeCreate() {
      axios({
        method: 'get',
        url: `${CONFIG.URL}/auctions`,
      }).then((response) => {
        this.auctionDetail = response.data
      }).catch((err) => {
        this.message = err
      });
    },

  }
</script>

<style scoped>

</style>
