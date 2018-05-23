<template>
  <div class="container">
    <div class="row">
      <div class="col-1"></div>
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
        createMessage: '',
        photo: ''
      }
    },

    computed: {
      auctionDetail: {
        get () {
          return this.auctions
        },
        set (response) {
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

      getDate() {
        let url = `${CONFIG.URL}`;
        if (this.$route.params.type === 'seller') {
          url += `/auctions?seller=${this.$route.params.id}`
        }
        if (this.$route.params.type === 'winner') {
          url += `/my_won_auctions`
        }
        if (this.$route.params.type === 'bidder') {
          url += `/auctions?bidder=${this.$route.params.id}`
        }
        axios({
          method: 'get',
          url: url,
          headers: {
            'X-Authorization': window.sessionStorage.token
          }
        }).then((response) => {
          if (response.data.length === 0) {
            this.message = 'No result';
            this.auctionDetail = []
          }
          else {
            this.message = '';
            this.auctionDetail = response.data
          }
        }).catch((err) => {
          this.message = 'Get auction wrong'
        });
      },
    },
    created() {
      this.getDate()
    }
  }
</script>

<style scoped>

</style>
