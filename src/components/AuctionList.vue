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
              <li class="auction text-primary"><h5>{{auction.title}}</h5></li>
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

  export default {
    name: "AuctionList",
    components: {
      Search
    },
    data() {
      return {
        auctions: [
          {
            "currentBid": null,
            "id": 6,
            "categoryId": 1,
            "title": "Changed auction title, for testing purposes.",
            "reservePrice": 1000,
            "startDateTime": null,
            "endDateTime": null,
            "categoryTitle": "apparel"
          },
          {
            "currentBid": null,
            "id": 2,
            "categoryId": 4,
            "title": "Broken pyramid",
            "reservePrice": 1000000,
            "startDateTime": 1518606000000,
            "endDateTime": 1519729200000,
            "categoryTitle": "property"
          },
          {
            "currentBid": 400,
            "id": 3,
            "categoryId": 1,
            "title": "One boot",
            "reservePrice": 10,
            "startDateTime": 1518606000000,
            "endDateTime": 1520938800000,
            "categoryTitle": "apparel"
          },
          {
            "currentBid": null,
            "id": 5,
            "categoryId": 5,
            "title": "A cache of vibranium",
            "reservePrice": 500000,
            "startDateTime": 1518606000000,
            "endDateTime": 1530273600000,
            "categoryTitle": "other"
          },
          {
            "currentBid": 10,
            "id": 1,
            "categoryId": 1,
            "title": "Super cape",
            "reservePrice": 10,
            "startDateTime": 1518606000000,
            "endDateTime": 1520938800000,
            "categoryTitle": "apparel"
          },
          {
            "currentBid": 1000,
            "id": 4,
            "categoryId": 5,
            "title": "Intrinsic Field Subtractor",
            "reservePrice": 100,
            "startDateTime": 1518606000000,
            "endDateTime": 1530273600000,
            "categoryTitle": "other"
          },
          {
            "currentBid": 1400,
            "id": 18,
            "categoryId": 1,
            "title": "Underwater bat suit",
            "reservePrice": 1000,
            "startDateTime": 1524807869000,
            "endDateTime": 1524807874000,
            "categoryTitle": "apparel"
          },
          {
            "currentBid": null,
            "id": 8,
            "categoryId": 1,
            "title": "Super cape",
            "reservePrice": 1000,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "apparel"
          },
          {
            "currentBid": null,
            "id": 12,
            "categoryId": 4,
            "title": "Winter palace at the north pole",
            "reservePrice": 8000,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "property"
          },
          {
            "currentBid": null,
            "id": 7,
            "categoryId": 1,
            "title": "Inspector Gadget trench coat",
            "reservePrice": 789,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "apparel"
          },
          {
            "currentBid": null,
            "id": 15,
            "categoryId": 5,
            "title": "A cache of vibranium.",
            "reservePrice": 5000000,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "other"
          },
          {
            "currentBid": null,
            "id": 11,
            "categoryId": 3,
            "title": "Death Star (broken)",
            "reservePrice": 1000000,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "vehicles"
          },
          {
            "currentBid": null,
            "id": 14,
            "categoryId": 5,
            "title": "Intrinsic Field Subtractor",
            "reservePrice": 1,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "other"
          },
          {
            "currentBid": null,
            "id": 10,
            "categoryId": 2,
            "title": "Mary Poppin's Other Umbrella",
            "reservePrice": 10000,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "equipment"
          },
          {
            "currentBid": null,
            "id": 9,
            "categoryId": 2,
            "title": "Mary Poppin's Umbrella",
            "reservePrice": 10000,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "equipment"
          },
          {
            "currentBid": null,
            "id": 13,
            "categoryId": 4,
            "title": "Broken Pyramid",
            "reservePrice": 99999999.99,
            "startDateTime": 1527437612000,
            "endDateTime": 1530067358000,
            "categoryTitle": "property"
          }
        ]
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
