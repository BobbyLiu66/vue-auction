import Vue from 'vue'
import Router from 'vue-router'
import AuctionPhoto from '@/components/AuctionPhoto'
import UserInfo from '@/components/UserInfo'
import AuctionDetails from '@/components/AuctionDetails'
import Home from '@/components/Home'
import UserAuction from '@/components/UserAuction'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/user/auction',
      name:'UserAuction',
      component:UserAuction
    },
    {
      path: '/user/info',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/auction/photo',
      name: 'AuctionPhoto',
      component: AuctionPhoto
    },
    {
      path: '/auction/details/:id',
      name: 'AuctionDetails',
      component: AuctionDetails
    }
  ]
})
