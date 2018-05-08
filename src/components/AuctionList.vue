<template>
  <div class="col-9" v-if="auctions.length > 0">
  <div class="row border auction" v-for="auction in auctions">
    <div class="col-3"><img src="../assets/test.jpg" alt=""/></div>
    <div class="col-7 offset-md-2">
      <ul class="list-group">
        <li class="auction text-primary">
          <router-link :to="{name:'AuctionDetails',params:{id:auction.id}}"><h5>{{auction.title}}</h5></router-link>
        </li>
        <li class="auction text-muted">
          <small>{{auction.categoryTitle}}</small>
        </li>
        <li class="auction">NZD{{auction.reservePrice}}</li>
      </ul>
    </div>
  </div>
  </div>

</template>

<script>
  export default {
    name: "AuctionList",
    props: ['auctionDetail'],
    computed: {
      auctions: function () {
        return this.auctionDetail
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
