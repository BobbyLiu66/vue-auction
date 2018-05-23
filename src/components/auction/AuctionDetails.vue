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

      <div class="offset-md-2 col-6" v-if="id">
        <img v-bind:src="imageUrl" alt=""/>
      <p v-if="new Date() < details.startDateTime">Start from: <span v-bind:class="timeStyle">{{monthDate(details.startDateTime)}}</span></p>
      <p v-else-if="new Date() < details.endDateTime">End at: <span v-bind:class="timeStyle">{{monthDate(details.endDateTime)}}</span></p>
        <p v-else class="text-muted">This auction has already expired</p>
      </div>

    <div class="offset-md-2 col-6" v-else>
      <Loading/>
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
            <button type="button" class="btn btn-primary" @click="bid"
                    :disabled="new Date() >= details.endDateTime">Bid Now
            </button>
          </td>
        </tr>
        <tr v-if="details.seller.id === userId">
          <td colspan="2" class="text-center">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modify"
                    :disabled="details.startDateTime <= new Date()">
              Modify your auction
            </button>
            <AuctionModify v-bind:modify="details" v-on:modifyAuction="updateAuctionInfo"/>
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
  import Loading from '../Loading'

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  export default {
    name: "AuctionDetails",
    components: {
      AuctionModify,
      Loading
    },
    data() {
      return {
        bidHistoryStatus: true,
        details: {seller: {}},
        bidList: [],
        previousDate: '',
        message: '',
        userBid: '',
        id: '',
        reload: true
      }
    },
    created() {
      this.getInformation()
    },

    computed: {
      userId() {
        this.$store.getters.refresh
        return parseInt(window.sessionStorage.userId)
      },
      imageUrl() {
        return `http://localhost:4941/api/v1/auctions/${this.id}/photos/`
      },
      timeStyle() {
        const now = new Date();
        let style = {'text-success': true};
        if(this.details.startDateTime > now){
          //upcoming
          style = {
            'text-info': true
          }
        }
        else if(this.details.endDateTime < now){
          //end
          if(this.details.endDateTime - now < 8.64e+7){
            style = {
              'text-danger': true
            }
          }
        }
        return style
      }
    },


    methods: {
      updateAuctionInfo() {
        window.location.reload()
      },
      getInformation() {
        axios({
          method: 'get',
          url: `${CONFIG.URL}/auctions/${this.$route.params.id}`,
        }).then((response) => {
          this.id = this.$route.params.id;
          this.details = response.data;
          this.details.startTime = this.formatDate(this.details.startDateTime);
          this.details.endTime = this.formatDate(this.details.endDateTime);
          this.bidList = response.data.bids;
        }).catch((err) => {
          this.message = 'Get details wrong';
          setTimeout(() => {
            this.message = ''
          }, 5 * 1000)
        });
      },

      formatDate(date) {
        const dateTime = new Date(date);
        return `${dateTime.getFullYear()}-${dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1}-${dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()}`;
      },

      bid() {
        if (!window.sessionStorage.token) {
          this.message = "Your should login before you make bid"
        }
        else if (this.userBid <= this.details.currentBid) {
          this.message = "Bid amount should be more than current bid amount"
        }
        else if (new Date() >= new Date(this.details.endDateTime)) {
          this.message = "Bid amount should be more than current bid amount"
        }

        else {
          axios({
            method: 'post',
            url: `${CONFIG.URL}/auctions/${this.$route.params.id}/bids?amount=${parseInt(this.userBid)}`,
            headers: {
              'X-Authorization': window.sessionStorage.token
            }
          }).then(() => {
            this.message = 'Bid success';
            this.getInformation()
          }).catch((err) => {
            this.message = 'Bid fail'
          });
        }
        setTimeout(() => {
          this.message = ''
        }, 5 * 1000)
      },

      checkDate(dateTime) {
        const time = new Date(dateTime);
        const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
        const newDate = `${day} ${months[time.getMonth()]} ${time.getFullYear()}`;
        return newDate === this.previousDate
      },

      hourMinutes(dateTime) {
        const time = new Date(dateTime);
        const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
        return `${hours}:${minutes}`
      },

      monthDate(dateTime) {
        const time = new Date(dateTime);
        const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
        this.previousDate = `${day} ${months[time.getMonth()]} ${time.getFullYear()}`;
        return this.previousDate
      },

      bidHistory() {
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
</style>
