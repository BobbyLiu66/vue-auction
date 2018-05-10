<template>
  <div class="container">
    <div v-if="message" class="alert alert-warning alert-dismissible fade show text-center" role="alert">
      <span>{{message}}</span>
    </div>
    <div class="row">

      <div class="offset-md-2 col-6">
        <h2>{{details.title}}</h2>
        <p>{{details.description}}</p>
        <p class="text-muted">{{details.categoryTitle}}</p>
      </div>
    </div>
    <div class="row">
      <div class="offset-md-2 col-6">

        <img src="../../assets/test.jpg" alt=""/>
      </div>
      <div class="col-3">
        <table class="table">
          <tr>
            <td>Reserve Price:</td>
            <td>NZD{{details.reservePrice}}</td>
          </tr>
          <tr>
            <td>Starting Price:</td>
            <td>NZD{{details.startingBid}}</td>
          </tr>
          <tr>
            <td>Current Price:</td>
            <td>NZD{{details.currentBid}}</td>
          </tr>
          <tr v-if="details.seller.id !== userId">
            <td>your bid amount:</td>
            <td><input type="number" class="form-control form-control-sm" placeholder="Enter your bid amount."
                       v-model="userBid"/>
            </td>
          </tr>
          <tr v-if="details.seller.id !== userId">
            <td colspan="2" class="text-center">
              <button type="button" class="btn btn-primary" @click="bid">Bid Now</button>
            </td>
          </tr>
          <tr v-if="details.seller.id === userId">
            <td colspan="2" class="text-center">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modify" :disabled="details.startDateTime <= new Date()">
                Modify your auction
              </button>
              <AuctionModify :modify="details" v-on="updateAuctionInfo"/>
            </td>
          </tr>
          <tr v-if="details.seller.id !== userId">
            <td colspan="2" class="text-center">
              <p class="text-muted">Seller Detail:
                <router-link :to="{name:'UserInfo',params:{id:details.seller.id}}">{{details.seller.username}}
                </router-link>
              </p>
            </td>
          </tr>
        </table>
        <div class="row"></div>
        <table class="table">
          <thead>
          <tr>
            <th class="text-center" colspan="3"><a href="#" @click="bidHistory">Bid History</a></th>
          </tr>
          </thead>
          <tbody v-for="bids in bidList" v-bind:class="{'history':bidHistoryStatus}">

          <tr v-if="!checkDate(bids.datetime)">
            <td colspan="3">{{monthDate(bids.datetime)}}</td>
          </tr>
          <tr>
            <td>NZD{{bids.amount}}</td>
            <td>
              <router-link :to="{name:'UserInfo',params:{id:bids.buyerId}}"><p class="text-truncate">
                {{bids.buyerUsername}}</p></router-link>
            </td>
            <td>{{hourMinutes(bids.datetime)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
  import CONFIG from '../../CONFIG'
  import AuctionModify from './AuctionModify'

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  export default {
    name: "AuctionDetails",
    components: {
      AuctionModify
    },
    data() {
      return {
        bidHistoryStatus: true,
        details: {seller: {}},
        bidList: [],
        previousDate: '',
        message: '',
        userBid: ''
      }
    },
    created() {
      this.getInformation()
    },

    computed: {
      updateAuctionInfo(response) {
        if (response.startDateTime) {
          this.details.startTime = this.formatDate(response.startDateTime);
          this.details.endTime = this.formatDate(response.endDateTime);
          this.details = response
        }
      },
      userId() {
          this.$store.getters.refresh
          return parseInt(window.sessionStorage.userId)
      }
    },


    methods: {
      getInformation: function () {
        axios({
          method: 'get',
          url: `${CONFIG.URL}/auctions/${this.$route.params.id}`,
        }).then((response) => {
          this.details = response.data;
          this.details.startTime = this.formatDate(this.details.startDateTime);
          this.details.endTime = this.formatDate(this.details.endDateTime);
          this.bidList = response.data.bids;
        }).catch((err) => {
          this.message = err;
          setTimeout(() => {
            this.message = ''
          }, 5 * 1000)
        });
      },
      formatDate: function (date) {
        const dateTime = new Date(date);
        return `${dateTime.getFullYear()}-${dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1}-${dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()}`;
      },
      //TODO
      bid: function () {
        if (this.userBid <= this.details.currentBid) {
          this.message = "Bid amount should be more than current bid amount"
        }
        else if (!window.sessionStorage.token) {
          this.message = "Your should login before you make bid"
        }
        else {
          axios({
            method: 'post',
            url: `${CONFIG.URL}/auctions/${this.$route.params.id}/bids?amount=${parseInt(this.userBid)}`,
            headers: {
              'X-Authorization': window.sessionStorage.token
            }
          }).then(() => {
            this.message = 'bid success';
            this.getInformation()
          }).catch((err) => {
            this.message = err
          });
        }

        setTimeout(() => {
          this.message = ''
        }, 5 * 1000)
      },
      checkDate: function (dateTime) {
        const time = new Date(dateTime);
        const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
        const newDate = `${day} ${months[time.getMonth()]}`;
        return newDate === this.previousDate
      },
      hourMinutes: function (dateTime) {
        const time = new Date(dateTime);
        const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
        return `${hours}:${minutes}`
      },
      monthDate: function (dateTime) {
        const time = new Date(dateTime);
        const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
        this.previousDate = `${day} ${months[time.getMonth()]}`;
        return this.previousDate
      },
      bidHistory: function () {
        this.bidHistoryStatus = !this.bidHistoryStatus
      }
    }
  }
</script>

<style scoped>
  img {
    width: 225px;
    height: 225px;
    margin: 10px;
  }

  table {
    empty-cells: show;
  }

  .history {
    display: none;
  }
</style>
