<template>
  <table>
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">categoryId</th>
      <th scope="col">title</th>
      <th scope="col">reservePrice</th>
      <th scope="col">currentBid</th>
      <th scope="col">startDateTime</th>
      <th scope="col">endDateTime</th>
      <th scope="col">categoryTitle</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="auction in auctions">
      <th scope="row">auction.id</th>
      <td>auction.categoryId</td>
      <td>auction.title</td>
      <td>auction.reservePrice</td>
      <td>auction.currentBid</td>
      <td>auction.currentBid</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  // {
  //   "currentBid": null,
  //   "id": 6,
  //   "categoryId": 1,
  //   "title": "Changed auction title, for testing purposes.",
  //   "reservePrice": 1000,
  //   "startDateTime": null,
  //   "endDateTime": null,
  //   "categoryTitle": "apparel"
  // },
  export default {
    name: "AuctionList",
    data() {
      return {
        auctions: []
      }
    }
  }
</script>

<style scoped>

</style>
