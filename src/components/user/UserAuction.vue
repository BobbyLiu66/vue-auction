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
            const timeLine = new Date();
            let closedFlag = true;
            let processFlag = true;
            response.data.map((data) => {
              const dataTime = new Date(data.endDateTime);
              if (dataTime < timeLine && closedFlag) {
                data.additional = 'Closed';
                closedFlag = false
              }
              else if (processFlag) {
                data.additional = 'In process';
                processFlag = false
              }
            });
            this.auctionDetail = response.data
          }
        }).catch((err) => {
          this.message = 'something wrong'
        });
      },

      //TODO move to another position
      // createAuction() {
      //   if(this.validateDateTime()){
      //     axios({
      //       method: 'post',
      //       url: `${CONFIG.URL}/auctions`,
      //       headers: {
      //         'X-Authorization': window.sessionStorage.token
      //       },
      //       data:{
      //         "categoryId": parseInt(this.categoryId),
      //         "title": this.title,
      //         "description": this.description,
      //         "startDateTime": (new Date(this.startDateTime)).getTime(),
      //         "endDateTime": (new Date(this.endDateTime)).getTime(),
      //         "reservePrice": parseInt(this.reservePrice),
      //         "startingBid": parseInt(this.startingBid)
      //       }
      //     }).then((response) => {
      //       axios({
      //         method:'post',
      //         url:`${CONFIG.URL}/auctions/${response.data.id}/photos`,
      //         headers: {
      //           'X-Authorization': window.sessionStorage.token,
      //           'Content-Type': `image/${this.fileType}`
      //         },
      //         data:this.photo
      //       }).then(()=>{
      //         this.message = "create auction success";
      //         $('#Create').modal('hide');
      //         this.getDate()
      //       }).catch((err)=>{this.message = err});
      //     }).catch((err) => {
      //       this.message = err
      //     });
      //   }
      //   else {
      //     this.createMessage = "Start Date Time or End Date Time is illegal"
      //   }
      // },
      //
      // validateDateTime() {
      //   return !(new Date(this.endDateTime) < new Date(this.startDateTime) || new Date(this.startDateTime) < new Date());
      // }
      //
    },
    created() {
      this.getDate()
    }
  }
</script>

<style scoped>

</style>
