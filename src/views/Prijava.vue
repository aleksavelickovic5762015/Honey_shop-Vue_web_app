<template lang="html">

  <section class="prijava">
    <div class='card border-0'>
      <div class='card-content'>
        <table class='center'>
          <tr>
            <td style="width:250px">
              <h4>KORISNIČKO IME: </h4>
            </td>
            <td><input type='text' v-model='korisnicko_ime'></td>
          </tr>
          <tr>
            <td>
              <h4>ŠIFRA: </h4>
            </td>
            <td><input type='password' v-model='sifra'></td>
          </tr>
          <tr>
            <td>
              <button @click="prijava()" type="button" class="btn btn-light  btn-sm" style='width:100px; margin-bottom: 5px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>PRIJAVA</button>
            </td>
          </tr>
          <tr>
            <td>
              <router-link to='/registracija' class="proizvodlink">
                <h5 style="color: #ffcc00 !important;">REGISTRACIJA</h5>
              </router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <modal name='prijavaModal'>
      <div class='modali'>
        </br></br></br></br>
        <h4 style='color:black !important;'>GREŠKA U PODACIMA!</h4></br>
        <button @click="zatvori()" type="button" class="btn btn-light  btn-sm" style='width:150px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ZATVORI</button>
        </br></br></br></br></br></br>
      </div>
    </modal>
  </section>

</template>

<script lang="js">
  import korisnici from '../data/korisnici'

  export default  {
    name: 'prijava',
    props: [],
    mounted () {

    },
    data () {
      return {
        korisnicko_ime: '',
        sifra: '',
        mojikorisnici: korisnici
      }
    },
    methods: {
      prijava(){
        if(localStorage.getItem('korisniciStor')==null){
          localStorage.setItem('korisniciStor', JSON.stringify(this.mojikorisnici));
        }
        else{
          this.mojikorisnici = JSON.parse(localStorage.getItem('korisniciStor'));
        }
        
        var korisnik = this.mojikorisnici.find(korisnik=> korisnik.korisnicko_ime==this.korisnicko_ime
                                    & korisnik.sifra==this.sifra);
        if (korisnik==null) {
          //alert('Greska u podacima')
          this.$modal.show('prijavaModal');
        }
        else {
          localStorage.setItem('prijavljenStor', JSON.stringify(korisnik.korisnik_id));
          this.$router.push('proizvodi');
          //location.reload();

          this.$root.$emit('prijava', 'neko se prijavio')
        }
      },
      zatvori(){
        this.$modal.hide('prijavaModal')
      }
    },
    computed: {

    }
}


</script>

<style>
  .modali {
    background-color: #ff9900;
  }
  .prijava {

  }
</style>
