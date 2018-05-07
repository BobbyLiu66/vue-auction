<template>
  <div class="container">
    <div class="row">
      <div class="col-3" style="margin-top: 15px">
        <Search/>
      </div>
      <div class="col-9">
        <div class="row border auction" v-for="auction in auctions">
          <div class="col-3"><img src="../assets/test.jpg" alt=""/></div>
          <div class="col-7 offset-md-2">
            <ul class="list-group">
              <li class="auction text-primary"><router-link :to="{name:'AuctionDetails',params:{id:auction.id}}"><h5>{{auction.title}}</h5></router-link></li>
              <li class="auction text-muted">
                <small>{{auction.categoryTitle}}</small>
              </li>
              <li class="auction">NZD{{auction.reservePrice}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './Search'
  import CONFIG from '../CONFIG'

  export default {
    name: "AuctionList",
    components: {
      Search
    },
    created(){
      axios({
        method: 'get',
        url: `${CONFIG.URL}/auctions`,
      }).then((response) => {
        this.auctions = response.data
      }).catch((err) => {
        this.errorMessage = err
      });
    },

    data() {
      return {
        auctions: []
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
  }

  img {
    width: 200px;
    height: 200px;
    margin: 10px;
  }

  .border {
    border-radius: 15px;
    border: solid #e7e7e7 1px;
  }

  .auction {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
