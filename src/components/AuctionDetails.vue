<template>
  <div class="container">
    <div class="row">
      <div class="offset-md-2 col-6">
        <h2>{{result.title}}</h2>
        <p>{{result.description}}</p>
        <p class="text-muted">{{result.categoryTitle}}</p>
      </div>
    </div>
    <div class="row">
      <div class="offset-md-2 col-6">

        <img src="../assets/test.jpg" alt=""/>
      </div>
      <div class="col-3">
        <table class="table">
          <tr>
            <td>Reserve Price:</td>
            <td>NZD{{result.reservePrice}}</td>
          </tr>
          <tr>
            <td>Starting Price:</td>
            <td>NZD{{result.startingBid}}</td>
          </tr>
          <tr>
            <td>Current Price:</td>
            <td>NZD{{result.currentBid}}</td>
          </tr>
          <tr>
            <td>your bid amount:</td>
            <td><input type="number" class="form-control form-control-sm" placeholder="Enter your bid amount."
                       v-bind:max="result.reservePrice" v-bind:min="result.currentBid"/>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="text-center">
              <button type="button" class="btn btn-primary" @click="bid">Bid Now</button>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="text-center">
              <p class="text-muted">Seller Detail:
                <router-link :to="userInfo">{{result.seller}}</router-link>
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
          <tbody v-for="bids in result.bids" v-bind:class="{'history':bidHistoryStatus}">

          <tr v-if="!checkDate(bids.datetime)">
            <td colspan="3">{{monthDate(bids.datetime)}}</td>
          </tr>
          <tr>
            <td>NZD{{bids.amount}}</td>
            <td>
              <router-link :to="{name:'UserInfo',params:'userId:bids.buyerId'}"><p class="text-truncate">{{bids.buyerUsername}}</p></router-link>
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
  import CONFIG from '../CONFIG'
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  export default {
    name: "AuctionDetails",
    data() {
      return {
        bidHistoryStatus: true,
        result: {},
        previousDate: ''
      }
    },
    created(){
      axios({
        method: 'get',
        url: `${CONFIG.URL}/auctions/${this.$route.params.id}`,
      }).then((response) => {
        this.result = response.data
      }).catch((err) => {
        this.errorMessage = err
      });
    },
    methods: {
      bid: function () {
      },
      //TODO
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
