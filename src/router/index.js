import Vue from 'vue'
import VueRouter from 'vue-router'
import Pocetna from '../views/Pocetna.vue'
import Proizvodi from '../views/Proizvodi.vue'
import proizvodinfo from '../views/Proizvodinfo.vue'
import prijava from '../views/Prijava.vue'
import registracija from '../views/Registracija'
import podaci from '../views/Podaci'
import izmena from '../views/Izmena'
import izmenasifra from '../views/Izmenasifra'
import korpa from '../views/Korpa'
import narudzbine from '../views/Narudzbine'
import narudzbineprodavac from '../views/Narudzbineprodavac'
import proizvodizmena from '../views/Proizvodizmena'
import proizvodnovi from '../views/Proizvodnovi'
//
import watchtest from '../views/watchtest'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna
  },
  {
    path: '/proizvodi',
    name: 'Proizvodi',
    component: Proizvodi
  },
  {
    path: '/proizvodinfo/:id',
    name: 'Proizvodinfo',
    component: proizvodinfo
  },
  {
    path: '/prijava',
    name: 'Prijava',
    component: prijava
  },
  {
    path: '/registracija',
    name: 'Registracija',
    component: registracija
  },
  {
    path: '/podaci',
    name: 'Podaci',
    component: podaci
  },
  {
    path: '/izmena',
    name: 'Izmena',
    component: izmena
  },
  {
    path: '/izmenasifra',
    name: 'Izmenasifra',
    component: izmenasifra
  },
  {
    path: '/korpa',
    name: 'Korpa',
    component: korpa
  },
  {
    path: '/narudzbine',
    name: 'Narudzbine',
    component: narudzbine
  },
  {
    path: '/narudzbineprodavac',
    name: 'Narudzbineprodavac',
    component: narudzbineprodavac
  },
  {
    path: '/proizvodizmena/:id',
    name: 'Proizvodizmena',
    component: proizvodizmena
  },
  {
    path: '/proizvodnovi',
    name: 'Proizvodnovi',
    component: proizvodnovi
  },
  //
  {
    path: '/watchtest',
    name: 'watchtest',
    component: watchtest
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
