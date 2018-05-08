<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-if="message" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
          <span>{{message}}</span>
        </div>
      </div>
      <div class="col-3"></div>
      <AuctionList :auctionDetail="auctions"/>
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
        auctions: [],
        message: ''
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
            //TODO test
            response.data.forEach((data) => {
              const dataTime = new Date(data.endDateTime);
              if (dataTime < timeLine && closedFlag) {
                data.additional = 'Closed';
                closedFlag = false
              }
              else if(processFlag){
                data.additional = 'In process';
                processFlag = false
              }
            });
            this.auctionDetail = response.data
          }
        }).catch((err) => {
          this.message = err
        });
      }
    },
    created() {
      this.getDate()
    }
  }
</script>

<style scoped>

</style>
