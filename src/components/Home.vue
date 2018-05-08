<template>
  <div class="container">
    <div class="row">
      <div class="col-3" style="margin-top: 15px">
        <Search v-on:search="getSearch"/>
      </div>
        <AuctionList :auctionDetail="auctionDetail"/>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import AuctionList from '@/components/AuctionList'
  import Search from '@/components/Search'
  import CONFIG from '../CONFIG'

  export default {
    name: "Home",
    components: {
      Navbar,
      AuctionList,
      Search
    },
    data(){
      return {
        auctions:[]
      }
    },
    computed:{
      auctionDetail:{
        get: function () {
          return this.auctions
        },
        set: function (response) {
          this.auctions = response
        }
      }
    },
    methods:{
      getSearch:function (result) {
        this.auctionDetail = result
      }
    },
    created(){
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
