<template lang="html">

  <div class="navigation">
    <nav class='navbar container'>
      <div class='navbar-brand'>
        <router-link to="/">
          <img src='../assets/logo_lat_1.png' width='200px'>
        </router-link>
      </div>
      <div class='navbar-menu'>
        <router-link to="/proizvodi">PROIZVODI</router-link> &ensp;&ensp;

        <router-link to="/podaci" v-if="prijavljenBoolFun">NALOG</router-link>&ensp;&ensp;
        <router-link to="/prijava" v-else>PRIJAVA</router-link>&ensp;&ensp;

        <router-link v-if='prijavljenProdavac' to="/narudzbineprodavac">NARUDZBINE</router-link>&ensp;&ensp;
        <router-link v-else to="/korpa">KORPA</router-link>&ensp;&ensp;

        <button type="button" class="btn btn-light  btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;' @click="localS_brisi">BRISI</button>
      </div>
    </nav>
  </div>

</template>

<script lang="js">

  export default  {
    name: 'navigation',
    props: [],
    mounted () {
      this.$root.$on('prijava', (v) => {
        //this.poruka = v
        this.prijavljenBool = true
      })
      //
      this.$root.$on('odjava', (v) => {
        //this.poruka = v
        this.prijavljenBool = false
      })
    },
    data () {
      return {
        prijavljenBool: false,
        prijavljenProdavac: false,
        poruka: 'niko nije prijavljen'
      }
    },
    watch: {
      prijavljenBool: {
        handler: 'prijavljenProdavacFun',
        imediate: true
      }
    },
    methods: {
      prijavljenProdavacFun(){
        var korisnikID = localStorage.getItem('prijavljenStor')
        if(korisnikID){
          var korisnici = JSON.parse(localStorage.getItem('korisniciStor'));
          var korisnik = korisnici.find(korisnik => korisnik.korisnik_id == korisnikID);
          if(korisnik.tip == "prodavac"){
            this.prijavljenProdavac = true
            return this.prijavljenProdavac
          }
        }
        //
        this.prijavljenProdavac = false
        return this.prijavljenProdavac
      },
      //
      localS_brisi(){
        localStorage.clear();
        location.reload();
      }
    },
    computed: {
      prijavljenBoolFun() {
        //alert("tu sam")
        if(localStorage.getItem('prijavljenStor')==null){
          //return true
          this.prijavljenBool = false
          return this.prijavljenBool
        }
        else{
          //return false
          this.prijavljenBool = true
          return this.prijavljenBool
        }
      }      
    }
}


</script>

<style>
  .navigation {
    background-color: transparent;
  }
  a{
    font-family: "Lucida Console", "Courier New", monospace;
    color: white !important;
  }
</style>
