<template>
  <div>
    <AuctionList/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import AuctionList from '@/components/AuctionList'

  export default {
    name: "Home",
    components: {
      Navbar,
      AuctionList
    }
  }
</script>

<style scoped>

</style>
