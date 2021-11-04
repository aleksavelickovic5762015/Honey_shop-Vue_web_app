<template lang="html">

  <section class="proizvodi">
    <table class="center">
      <tr>
        <td style="width:250px">
          <div class="container" id="proizvodi">
            <div v-for='kt in pKategorije' class="filter">
              <label><input type="radio" v-model="selectedCategory" :value="kt"/><span class='span1' style="color: #ffcc00 !important;"> {{ kt }}</span></label><br/>
            </div>
          </div>
        </td>
        <td style="width:150px">
          <input type="text" v-model="search" placeholder="Pretraga.."/>
        </td>
        <td style="width:650px; text-align: right;">
          <div v-if='prijavljenProdavac()'>
            <router-link to='/proizvodnovi' class="proizvodlink">
              <h5 style="color: #ffcc00 !important;">NOVI PROIZVOD</h5>
            </router-link>
          </div>
        </td>
      </tr>
    </table></br>

    <table class='center'>
      <tr v-for="red in filteredProizvodiChunked">
        <td v-for="p in red" style="width:450px">
          <!--<h4>{{customer}}</h4>-->
          <proizvod :proizvod='p'/>
        </td>
      </tr>
    </table>

  </section>

</template>

<script lang="js">

  import proizvod from '../components/Proizvod'
  import proizvodi from '../data/proizvodi'

  export default  {
    name: 'proizvodi',
    props: [],
    components:{
      proizvod
    },
    mounted () {
      //proizvodiStor
      if(localStorage.getItem('proizvodiStor')==null){
        localStorage.setItem('proizvodiStor', JSON.stringify(this.proizvodi));
      }
      else{
        this.proizvodi = JSON.parse(localStorage.getItem('proizvodiStor'));
      }
      /////
      this.proizvodi.forEach(p => {
        var unetaKat = this.pKategorije.find(kt => kt==p.kategorija)
        if(unetaKat == null){
          this.pKategorije.push(p.kategorija)
        }
      });
      /////////////////////////////////////////////////
    },
    data () {
      return {
        proizvodi: proizvodi,
        selectedCategory: "SVI",
        search: "",
        pKategorije: ["SVI"]
      }
    },
    methods: {
      prijavljenProdavac(){
        var korisnikID = localStorage.getItem('prijavljenStor')
        if(korisnikID){
          var korisnici = JSON.parse(localStorage.getItem('korisniciStor'));
          var korisnik = korisnici.find(korisnik => korisnik.korisnik_id == korisnikID);
          if(korisnik.tip == "prodavac"){
            return true
          }
        }
        //
        return false
      }
    },
    computed: {
      filteredProizvodiChunked: function() {
        var category = this.selectedCategory;
        if(category === "SVI") {
          var proizvodiFunk = this.proizvodi;
        } else {
          var proizvodiFunk = this.proizvodi.filter(function(proizvod) {
            return proizvod.kategorija === category;
          });
        }
        
        var filtriraniProizvodi = proizvodiFunk.filter( proizvod =>
            proizvod.naziv.toLowerCase().includes(this.search.toLowerCase()) ||
            proizvod.opis.toLowerCase().includes(this.search.toLowerCase()) ||
            proizvod.nacinKoriscenja.toLowerCase().includes(this.search.toLowerCase())
          )
        
        var red = []
        var lista = []
        filtriraniProizvodi.forEach((e,i) => {
          red.push(e)
          if((i+1) % 2 == 0 || (i+1) == filtriraniProizvodi.length){
            lista.push(red)
            red = []
          }
        });

        return lista
      }
    }
}


</script>

<style>
  .row{
      justify-content: center !important;
      margin: 0px !important;
    }
  .proizvodi {

  }
</style>
