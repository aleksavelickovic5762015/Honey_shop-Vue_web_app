<template lang="html">

  <section class="korpa">

    <table class="center">
      <tr>
        <td style="width:250px">
          <span class='span1' style="color: #ffcc00 !important;"> UKUPNO: {{ ukupnaCena }}</span></br>
          <button @click="naruci()" type="button" class="btn btn-light btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>NARUCI</button></br>
        </td>
        <td style="width:200px">
          
        </td>
        <td style="width:650px; text-align: right;">
        
        </td>
      </tr>
    </table></br>

    <table class='center'>
      <tr v-for="red in proizvodiKorpaChunked">
        <td v-for="p in red" style="width:450px">
          <div class='card border-0'>
            <div class='card-content'>
              <table>
                <tr>
                  <td style="width:170px"><img :src="p[0].slika" width='150px'></td>
                  <td>
                    <router-link :to='/proizvodinfo/+p[0].proizvod_id' class="proizvodlink">
                      <h4>{{p[0].naziv}}</h4>
                    </router-link>
                    <span class='span1'>CENA: {{p[0].cena}}</span><br/>
                    <!--<input v-model='proizvodiKorpa[i].kolicina' @change='promeniKolicinu(i)' type=number style="width:50px; text-align:center; background-color: #ffcc00;"><br/>-->
                    <input v-model='p[0].kolicina' type=number min="1" @change='promeniKolicinu(p[1])' style="width:50px; text-align:center; background-color: #ffcc00;"><br/>
                    <span class='span1' style="color: #ffcc00 !important;">{{ p[0].cena*p[0].kolicina }}</span></br>
                    <button @click="obrisiKorpa(p[1])" type="button" class="btn btn-light btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>OBRISI</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </table></br>

    <table class="center">
      <tr>
        <td style="width:250px">
          <button @click="isprazniKorpa()" type="button" class="btn btn-light btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ISPRAZNI KORPU</button>
        </td>
        <td style="width:200px">
          
        </td>
        <td style="width:650px; text-align: right;">
          
        </td>
      </tr>
    </table></br>

  </section>

</template>

<script lang="js">
  
  import korpa from '../data/korpa'
  import proizvodi from '../data/proizvodi'
  import narudzbine from '../data/narudzbine'

  export default  {
    name: 'korpa',
    props: [],
    mounted() {
      //korpaStor
      if(localStorage.getItem('korpaStor')==null){
        localStorage.setItem('korpaStor', JSON.stringify(this.korpa));
      }
      else{
        this.korpa = JSON.parse(localStorage.getItem('korpaStor'));
      }
      //narudzbineStor
      if(localStorage.getItem('narudzbineStor')==null){
        localStorage.setItem('narudzbineStor', JSON.stringify(this.narudzbine));
      }
      else{
        this.narudzbine = JSON.parse(localStorage.getItem('narudzbineStor'));
      }
      //proizvodiStor
      if(localStorage.getItem('proizvodiStor')==null){
        localStorage.setItem('proizvodiStor', JSON.stringify(this.proizvodi));
      }
      else{
        this.proizvodi = JSON.parse(localStorage.getItem('proizvodiStor'));
      }
      /////

      //
      //var Vue = require('vue');
      //
      this.korpa.forEach((k,i) => {
        var proizvodK = this.proizvodi.find(proizvod=> proizvod.proizvod_id == k.proizvod_id);
        proizvodK['kolicina'] = k.kolicina
        //this.proizvodiKorpa.push(proizvodK);
        //this.proizvodiKorpa.push(Vue.util.extend({}, proizvodK))
        this.proizvodiKorpa.push(JSON.parse(JSON.stringify(proizvodK)));

        //this.ukupnaCena += this.proizvodiKorpa[i].cena * this.proizvodiKorpa[i].kolicina
      });

      //console.log(this.proizvodiKorpa);
      //this.proizvodiKorpa.forEach(p => this.$watch(() => p.kolicina, this.stampaj) );

      //console.log('inside mounted', this.proizvodiKorpa);
    },
    data () {
      return {
        korpa: korpa,
        narudzbine: narudzbine,
        proizvodi: proizvodi,
        proizvodiKorpa: [],
        ukupnaCena: 0
      }    
    },
    watch: {
      proizvodiKorpa: {
        handler: 'ukupnaCenaFun',
        //imediate: true,
        deep: true
      }
    },
    methods: {
      stampaj(){
        //alert("stampam")
        console.log("Promenjena kolicina");
      },
      //
      promeniKolicinu(i){
        this.korpa[i].kolicina = this.proizvodiKorpa[i].kolicina
        localStorage.setItem('korpaStor', JSON.stringify(this.korpa));

        //location.reload();
      },
      obrisiKorpa(i){
        this.korpa.splice(i, 1)
        this.proizvodiKorpa.splice(i, 1)

        localStorage.setItem('korpaStor', JSON.stringify(this.korpa));
      },
      isprazniKorpa(){
        this.proizvodiKorpa = []
        localStorage.setItem('korpaStor', JSON.stringify([]));
        
        //location.reload();
      },
      naruci(){
        if(localStorage.getItem('prijavljenStor')==null){
          this.$router.push('/prijava');
        }
        else{
          //
          var proizvodi_ids = []
          var kolicine = []
          //
          this.korpa.forEach( k => {
            proizvodi_ids.push(k.proizvod_id)
            kolicine.push(k.kolicina)  
          });

          var novaNarudzbina = {
              narudzbina_id: this.narudzbine.length,
              kolicine: kolicine,
              proizvod_ids: proizvodi_ids,
              korisnik_id: localStorage.getItem('prijavljenStor'),
              status: "U TOKU",
              iznos: this.ukupnaCena,
              br_dana: 0
          }

          this.narudzbine.push(novaNarudzbina)
          //
          localStorage.setItem('narudzbineStor', JSON.stringify(this.narudzbine));

          localStorage.setItem('korpaStor', JSON.stringify([]));
          this.proizvodiKorpa = []
          //
          //alert(JSON.stringify(localStorage.getItem('prijavljenStor')))
          this.$router.push('/narudzbine');
        }
      },
      ukupnaCenaFun(){
        //var ukupno = 0
        this.ukupnaCena = 0

        this.proizvodiKorpa.forEach(p => {
          this.ukupnaCena += parseInt(p.kolicina * p.cena)
        });

        return this.ukupnaCena
      }
    },
    computed: {
      proizvodiKorpaChunked(){
        var red = []
        var lista = []
        this.proizvodiKorpa.forEach((e,i) => {
          red.push([e,i])
          if((i+1) % 2 == 0 || (i+1) == this.proizvodiKorpa.length){
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
  .korpa {

  }
</style>
