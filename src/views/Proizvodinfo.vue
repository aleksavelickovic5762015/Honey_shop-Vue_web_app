<template lang="html">

  <section class="proizvodinfo">
    </br>
    <div class='card border-0'>
      <div class='card-content'>
        <table class='center'>
          <tr>
            <td style="width:170px"><img :src="mojproizvod.slika" width='200px'></td>
            <td>
              <h2 style="color: #ffcc00 !important;">{{mojproizvod.naziv}}</h2>
              <h5>CENA: {{mojproizvod.cena}}</h5>
              <h5> KATEGORIJA: {{mojproizvod.kategorija}}</h5>
              <h5>OPIS: {{mojproizvod.opis}}</h5>
              <h5>NAČIN KORIŠĆENJA: {{mojproizvod.nacinKoriscenja}}</h5>
            </td>
          </tr>
          <tr>
            <td style="width:270px">
            <!--<button @click="decrement()">-</button>-->
            <div v-if='prijavljenProdavac()'>
              </br>
              <button @click="pBrisi()" type="button" class="btn btn-light  btn-sm" style='width:170px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>BRISANJE PROIZVODA</button></br></br>
              <button @click="pIzmena()" type="button" class="btn btn-light  btn-sm" style='width:170px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>IZMENA PROIZVODA</button>
            </div>
            <div v-else>
              </br>
              <input v-model='kolicinaInfo' id=demoInput type=number min="1" value="1" style="width:50px; text-align:center; background-color: #ffcc00;">&ensp;&ensp;
              <button @click="korpaDodaj()" type="button" class="btn btn-light  btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>DODAJ U KORPU</button>
            </div>
            <!--<button @click="increment()">+</button>-->
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>

</template>

<script lang="js">

  import proizvodi from '../data/proizvodi'
  import korpa from '../data/korpa'

  export default  {
    name: 'proizvodinfo',
    props: [],
    mounted () {
      //proizvodiStor
      if(localStorage.getItem('proizvodiStor')==null){
        localStorage.setItem('proizvodiStor', JSON.stringify(this.proizvodi));
      }
      else{
        this.proizvodi = JSON.parse(localStorage.getItem('proizvodiStor'));
      }
      /////////////////////////////////////////////////
      var id = Number(this.$route.params.id);
      this.mojproizvod = this.proizvodi.find(proizvod=>proizvod.proizvod_id==id);
    },
    data () {
      return {
        kolicinaInfo: 1,
        proizvodi: proizvodi,
        korpa: korpa,
        mojproizvod: {}
      }
    },
    methods: {
      korpaDodaj(){        
        if(localStorage.getItem('korpaStor')==null){
          localStorage.setItem('korpaStor', JSON.stringify(this.korpa));
        }
        else{
          this.korpa = JSON.parse(localStorage.getItem('korpaStor'));
        }

        var nijeUkorpi = true
        //
        this.korpa.forEach((k, i) => {
          if(k.proizvod_id == this.mojproizvod.proizvod_id){
            this.korpa[i].kolicina = parseInt(this.korpa[i].kolicina) + parseInt(this.kolicinaInfo)
            
            nijeUkorpi = false
          }
        });
        //
        if(nijeUkorpi == true){
          var novaKorpa = {'kolicina': this.kolicinaInfo, 'proizvod_id': this.mojproizvod.proizvod_id}
          this.korpa.push(novaKorpa)
        }

        localStorage.setItem('korpaStor', JSON.stringify(this.korpa));

        this.$router.push('/proizvodi');
      },
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
      },
      pBrisi(){
        //alert(this.proizvodi.indexOf(this.mojproizvod))
        var brisiID = this.proizvodi.indexOf(this.mojproizvod)
        this.proizvodi.splice(brisiID, 1)

        localStorage.setItem('proizvodiStor', JSON.stringify(this.proizvodi));
        this.$router.push('/proizvodi');
      },
      pIzmena(){
        this.$router.push('/proizvodizmena/' + this.mojproizvod.proizvod_id);
      }
    },
    computed: {

    }
}


</script>

<style>
  .imgdetail{
    width: 30%;
  }

  .proizvodinfo {

  }
</style>
