<template>
  <div class="col-7 offset-md-1">
    <div v-if="auctions.length > 0 && Array.isArray(auctions)">
      <div v-for="auction in auctions">
        <div class="row"><h5 v-if="auction.additional" class="auction">{{auction.additional}}</h5></div>
        <div class="row border auction">
          <div class="col-3"><img v-bind:src="'http://localhost:4941/api/v1/auctions/'+auction.id+'/photos'" alt=""/>
          </div>
          <div class="col-7 offset-md-2">
            <ul class="list-group">
              <li class="auction text-primary">
                <router-link :to="{name:'AuctionDetails',params:{id:auction.id}}"><h5>{{auction.title}}</h5>
                </router-link>
              </li>
              <li class="auction text-muted">
                <small>{{auction.categoryTitle}}</small>
              </li>
              <li class="auction">NZD{{auction.reservePrice}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="auctions.length === 0 || auctions === undefined">
      <div class="lds-css ng-scope">
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-info alert-position" role="alert">
        {{auctions}}
      </div>
    </div>
  </div>

</template>

<script>
  import Loading from '../Loading'

  export default {
    name: "AuctionList",
    props: ['auctionDetail', 'categorySearch'],
    components: {Loading},
    computed: {
      auctions() {
        let result = this.auctionDetail;
        if (this.categorySearch) {
          result = [];
          this.auctionDetail.map((detail) => {
            detail.categoryId === this.categorySearch && result.push(detail)
          });
          if (result.length === 0) {
            result = "No available items found under such category"
          }
        }
        if (this.auctionDetail.length === 0) {
          result = "No available items found"
        }
        return result
      },
    },
  }
</script>

<style scoped>
  .alert-position {
    margin-top: 50px;
  }

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
