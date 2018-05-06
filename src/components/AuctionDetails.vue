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
                       v-bind:max="result.reservePrice" v-bind:min="result.currentBid" v-model="result.currentBid"/>
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
                <router-link to="/user/details">{{result.seller.username}}</router-link>
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
          <tr>
            <td colspan="3">{{}}</td>
          </tr>
          <tr>
            <td>NZD{{bids.amount}}</td>
            <td>
              <router-link :to="{name:'UserDetails',params:'userId:bids.buyerId'}">{{bids.buyerUsername}}</router-link>
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
  export default {
    name: "AuctionDetails",
    data() {
      return {
        bidHistoryStatus: true,
        result: {
          "categoryId": 1,
          "categoryTitle": "apparel",
          "title": "Super cape",
          "reservePrice": 10,
          "startDateTime": 1518606000000,
          "endDateTime": 1520938800000,
          "description": "One slightly used cape",
          "creationDateTime": 1518519600000,
          "startingBid": 0.01,
          "currentBid": 10,
          "bids": [
            {
              "buyerId": 1,
              "datetime": "2018-02-19T11:01:00.000Z",
              "amount": 10,
              "buyerUsername": "black.panther"
            }
          ],
          "seller": {
            "id": 2,
            "username": "superman"
          }
        },
        previousDate:''
      }
    },
    methods: {
      bid: function () {
      },
      hourMinutes: function (dateTime) {
        const time = new Date(dateTime);
        const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
        return `${hours}:${minutes}`
      },
      //TODO change number to words
      monthWeek:function(dateTime){
        const time = new Date(dateTime);
        const month = time.getMonth() < 10 ? `0${time.getMonth()}` : time.getMonth();
        const week = time.get() < 10 ? `0${time.getHours()}` : time.getHours();
        // return `${hours}:${minutes}`
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
