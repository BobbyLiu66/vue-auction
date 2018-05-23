<template>
  <div class="container-float">
    <div class="row">
      <div class="col-2 offset-md-1" style="margin-top: 15px">
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
        categoryId: ''
      }
    },
    computed: {
      auctionDetail: {
        get() {
          return this.auctions
        },
        set(response) {
          this.auctions = response
        }
      },
      categorySearch: {
        get() {
          return this.categoryId
        },
        set(response) {
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
        this.auctionDetail = response.data;
        if (response.data.length === 0){
          this.auctionDetail = "No available items found"
        }
      }).catch((err) => {
        this.message = 'No auction'
      });
    },

  }
</script>

<style scoped>

</style>
