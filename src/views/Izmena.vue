<template lang="html">

  <section class="izmena">
    <div class='card border-0'>
      <div class='card-content'>
        <table class='center'>
          <tr>
            <td>
              <h4>IME: </h4>
            </td>
            <td><input type=text v-model="mojkorisnik.ime" id="ime"></td>
          </tr>
          <tr>
            <td>
              <h4>PREZIME: </h4>
            </td>
            <td><input type=text v-model="mojkorisnik.prezime" id="prezime"></td>
          </tr>
          <tr>
            <td>
              <h4>ADRESA: </h4>
            </td>
            <td><input type=text v-model="mojkorisnik.adresa" id="adresa"></td>
          </tr>
          <tr>
            <td>
              <h4>BR. TEL: </h4>
            </td>
            <td><input type=text v-model="mojkorisnik.tel" id="tel"></td>
          </tr>
          <tr>
            <td>
              <h4>E-MEJL: </h4>
            </td>
            <td><input type=text v-model="mojkorisnik.mejl" id="mejl"></td>
          </tr>
          <tr>
            <td>
              <button @click="izmena" type="button" class="btn btn-light  btn-sm" style='width:100px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>IZMENI</button>
            </td>
            <td>
              <button @click="odustani" type="button" class="btn btn-light  btn-sm" style='width:100px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ODUSTANI</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <modal name='izmenaModal'>
      <div class='modali'>
        </br></br></br></br>
        <h4 style='color:black !important;'>{{greskaPoruka}}</h4></br>
        <button @click="zatvori()" type="button" class="btn btn-light  btn-sm" style='width:150px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ZATVORI</button>
        </br></br></br></br></br></br>
      </div>
    </modal>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'izmena',
    props: [],
    mounted () {
      this.mojkorisnik = this.mojikorisnici.find(korisnik=> korisnik.korisnik_id==this.korisnik_idStor)
    },
    data () {
      return {
        mojikorisnici: JSON.parse(localStorage.getItem('korisniciStor')),
        korisnik_idStor: JSON.parse(localStorage.getItem('prijavljenStor')),
        mojkorisnik: {},
        greskaPoruka: ''
      }
    },
    methods: {
      izmena(){
        if(this.mojkorisnik.ime == '' || this.mojkorisnik.prezime == '' || this.mojkorisnik.adresa == '' || this.mojkorisnik.tel == '' || this.mojkorisnik.mejl == ''){
          this.greskaPoruka = 'POPUNITI SVA POLJA!'
          this.$modal.show('izmenaModal');
          return
        }

        this.mojikorisnici[this.korisnik_idStor].ime = this.mojkorisnik.ime;
        this.mojikorisnici[this.korisnik_idStor].prezime = this.mojkorisnik.prezime;
        this.mojikorisnici[this.korisnik_idStor].adresa = this.mojkorisnik.adresa;
        this.mojikorisnici[this.korisnik_idStor].tel = this.mojkorisnik.tel;
        this.mojikorisnici[this.korisnik_idStor].mejl = this.mojkorisnik.mejl;

        localStorage.setItem('korisniciStor', JSON.stringify(this.mojikorisnici))

        this.$router.push('podaci');
      },
      odustani(){
        this.$router.push('podaci');
      },
      zatvori(){
        this.$modal.hide('izmenaModal')
      }
    },
    computed: {

    }
}


</script>

<style>
  .izmena {

  }
</style>
