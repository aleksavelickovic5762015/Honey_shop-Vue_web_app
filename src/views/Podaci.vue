<template lang="html">

  <section class="podaci">
    </br>
    <div class="row">
      <div class='card border-0'>
        <div class='card-content'>
          <table>
            <tr>
              <td>
                <button @click="odjava" type="button" class="btn btn-light  btn-sm" style='width:180px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ODJAVA</button>
              </td>
            </tr>
            </br>
            <tr>
              <td>
                <div v-if='prijavljenProdavac() == false'>
                  <router-link to='/narudzbine' class="proizvodlink">
                    <h5 style="color: #ffcc00 !important;">MOJE NARUDZBINE</h5>
                  </router-link>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <p class="tab"></p>
      <div class='card border-0'>
        <div class='card-content'>
          <table class='center'>
            <tr>
              <td><h4>IME: {{mojkorisnik.ime}}</h4></td>
            </tr>
            <tr>
              <td><h4>PREZIME: {{mojkorisnik.prezime}}</h4></td>
            </tr>
            <tr>
              <td><h4>ADRESA: {{mojkorisnik.adresa}}</h4></td>
            </tr>
            <tr>
              <td><h4>BR.TEL: {{mojkorisnik.tel}}</h4></td>
            </tr>
            <tr>
              <td><h4>E-MEJL: {{mojkorisnik.mejl}}</h4></td>
            </tr>
            <tr>
              <td><h4>TIP KORISNIKA: {{mojkorisnik.tip}}</h4></td>
            </tr>
            </br>
            <tr>
              <td>
                <router-link to='/izmena' class="proizvodlink">
                  <h5 style="color: #ffcc00 !important;">IZMENA PODATAKA</h5>
                </router-link>
              </td>
            </tr>
            <tr>
              <td>
                <router-link to='/izmenasifra' class="proizvodlink">
                  <h5 style="color: #ffcc00 !important;">PROMENA SIFRE</h5>
                </router-link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'podaci',
    props: [],
    mounted () {
      var korisnik_idStor = JSON.parse(localStorage.getItem('prijavljenStor'));
      this.mojkorisnik = this.mojikorisnici.find(korisnik=> korisnik.korisnik_id==korisnik_idStor)
    },
    data () {
      return {
        mojikorisnici: JSON.parse(localStorage.getItem('korisniciStor')),
        mojkorisnik: {}
      }
    },
    methods: {
      odjava(){
        localStorage.removeItem('prijavljenStor');
        localStorage.removeItem('korpaStor');
        this.$router.push('/');
        
        this.$root.$emit('odjava', 'neko se odjavio')
        //location.reload();
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
      }
    },
    computed: {

    }
}


</script>

<style>
  .podaci {

  }
  .tab { margin-left: 150px; }
</style>
