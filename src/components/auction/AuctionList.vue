<template>
  <div class="col-7 offset-md-1" >
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
    <div v-else-if="auctions.length ===0 ">
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
  export default {
    name: "AuctionList",
    props: ['auctionDetail', 'categorySearch'],
    computed: {
      auctions: function () {
        let result = this.auctionDetail;
        if (this.categorySearch) {
          result = [];
          this.auctionDetail.map((detail) => {
            detail.categoryId === this.categorySearch && result.push(detail)
          });
          if(result.length === 0){
            result = "No available items found under such category"
          }
        }
        if (this.auctionDetail.length === 0){
          result = "No available items found"
        }
        return result
      },

    },

  }
</script>

<style scoped>
  .alert-position{
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

  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .lds-spinner {
    margin: auto;
  }

  .lds-spinner div {
    left: 94px;
    top: 48px;
    position: absolute;
    -webkit-animation: lds-spinner linear 1s infinite;
    animation: lds-spinner linear 1s infinite;
    background: #007bff;
    width: 12px;
    height: 24px;
    border-radius: 40%;
    -webkit-transform-origin: 6px 52px;
    transform-origin: 6px 52px;
  }

  .lds-spinner div:nth-child(1) {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-animation-delay: -0.916666666666667s;
    animation-delay: -0.916666666666667s;
  }

  .lds-spinner div:nth-child(2) {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-animation-delay: -0.833333333333333s;
    animation-delay: -0.833333333333333s;
  }

  .lds-spinner div:nth-child(3) {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
    -webkit-animation-delay: -0.75s;
    animation-delay: -0.75s;
  }

  .lds-spinner div:nth-child(4) {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: -0.666666666666667s;
    animation-delay: -0.666666666666667s;
  }

  .lds-spinner div:nth-child(5) {
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
    -webkit-animation-delay: -0.583333333333333s;
    animation-delay: -0.583333333333333s;
  }

  .lds-spinner div:nth-child(6) {
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg);
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .lds-spinner div:nth-child(7) {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: -0.416666666666667s;
    animation-delay: -0.416666666666667s;
  }

  .lds-spinner div:nth-child(8) {
    -webkit-transform: rotate(210deg);
    transform: rotate(210deg);
    -webkit-animation-delay: -0.333333333333333s;
    animation-delay: -0.333333333333333s;
  }

  .lds-spinner div:nth-child(9) {
    -webkit-transform: rotate(240deg);
    transform: rotate(240deg);
    -webkit-animation-delay: -0.25s;
    animation-delay: -0.25s;
  }

  .lds-spinner div:nth-child(10) {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: -0.166666666666667s;
    animation-delay: -0.166666666666667s;
  }

  .lds-spinner div:nth-child(11) {
    -webkit-transform: rotate(300deg);
    transform: rotate(300deg);
    -webkit-animation-delay: -0.083333333333333s;
    animation-delay: -0.083333333333333s;
  }

  .lds-spinner div:nth-child(12) {
    -webkit-transform: rotate(330deg);
    transform: rotate(330deg);
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .lds-spinner {
    width: 200px !important;
    height: 200px !important;
    -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  }
</style>
