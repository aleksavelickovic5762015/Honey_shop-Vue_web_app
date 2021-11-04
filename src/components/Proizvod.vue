<template lang="html">

  <section class="proizvod">
    <div class='card border-0'>
      <div class='card-content'>
        <table>
          <tr>
            <td style="width:170px"><img :src="proizvod.slika" width='150px'></td>
            <td>
              <router-link :to='/proizvodinfo/+proizvod.proizvod_id' class="proizvodlink">
                <h4>{{proizvod.naziv}}</h4>
              </router-link>
              <span class='span1'>CENA: {{proizvod.cena}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'proizvod',
    props: [
      'proizvod'
    ],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style>
  .card{
    height: 200px;
    background-color: transparent !important;
  }
  .card-content{
    color: white;
    background-color: transparent;
    height: 200px;
    padding-top: 10px;
  }
  .proizvodlink{
    color: #ffcc00 !important;
  }  
  .span1{
    background: transparent !important;
  }
  .proizvod {

  }
</style>
