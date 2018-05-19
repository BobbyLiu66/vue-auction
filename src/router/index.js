import Vue from 'vue'
import Router from 'vue-router'
import UserInfo from '@/components/user/UserInfo'
import AuctionDetails from '@/components/auction/AuctionDetails'
import Home from '@/components/Home'
import UserAuction from '@/components/user/UserAuction'

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
      path:'/user/auction/:type/:id',
      name:'UserAuction',
      component:UserAuction
    },
    {
      path: '/user/info/:id',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/auction/details/:id',
      name: 'AuctionDetails',
      component: AuctionDetails
    }
  ]
})
