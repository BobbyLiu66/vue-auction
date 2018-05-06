import Vue from 'vue'
import Router from 'vue-router'
import AuctionModify from '@/components/AuctionModify'
import AuctionList from '@/components/AuctionList'
import AuctionPhoto from '@/components/AuctionPhoto'
import UserInfo from '@/components/UserInfo'
import AuctionDetails from '@/components/AuctionDetails'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AuctionList
    },
    {
      path: '/auction/modify',
      name: 'AuctionModify',
      component: AuctionModify
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
