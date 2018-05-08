<template>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <AuctionList :auctionDetail="auctionDetail"/>
    </div>
  </div>
</template>

<script>
  import AuctionList from '@/components/AuctionList'
  import CONFIG from '../CONFIG'

  export default {
    name: "UserAuction",
    components: {
      AuctionList
    },
    data() {
      return {
        auctions: []
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
    created() {

      let url = `${CONFIG.URL}/auctions`;
      if (this.$route.params.seller) {
        url += `?seller=${this.$route.params.id}`
      }
      if (this.$route.params.winner) {
        url += `?winner=${this.$route.params.id}`
      }
      if (this.$route.params.bidder) {
        url += `?bidder=${this.$route.params.id}`
      }

      axios({
        method: 'get',
        url: url,
      }).then((response) => {
        //TODO if [] add message
        this.auctionDetail = response.data
      }).catch((err) => {
        this.message = err
      });
    }
  }
</script>

<style scoped>

</style>
