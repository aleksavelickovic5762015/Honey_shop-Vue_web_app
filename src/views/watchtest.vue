<template lang="html">

  <section class="watchtest">
    <div v-for='(i, index) in products' :key=index>
      <input type=number v-model='i.price'>
    </div></br>
    <div v-for='(k, j) in korpa'>
      <input type=number v-model='k.kolicina'>
    </div>
  </section>

</template>

<script lang="js">

  import korpa from '../data/korpa'

  export default  {
    name: 'watchtest',
    props: [],
    mounted () {
      
    },
    data () {
      return {
        korpa: korpa,
        products: [
          {name: 'Raspberry Pi', shop: 'Amazon', price: '36'},
          {name: 'C.h.i.p', shop: 'Ebay', price: '25'},
          {name: 'Arduino', shop: 'Amazon', price: '66'}
        ]
      }
    },
    methods: {
      getSomeVal(val) {
        console.log(val)
      }
    },
    watch: {
      'products': {
        handler: 'getSomeVal',
        deep: true
      },
      korpa: {
        handler(val){
          console.log(val)
        },
        deep:true
      }
    },
    computed: {

    }
}


</script>

<style>
  .watchtest {

  }
</style>
