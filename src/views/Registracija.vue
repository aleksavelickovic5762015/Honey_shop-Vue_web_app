<template lang="html">

  <section class="registracija">
    <div class='card border-0'>
      <div class='card-content'>
        <table class='center'>
          <tr>
            <td style="width:250px">
              <h4>KORISNIČKO IME: </h4>
            </td>
            <td><input type=text v-model="korisnicko_ime"></td>
          </tr>
          <tr>
            <td>
              <h4>ŠIFRA: </h4>
            </td>
            <td><input type=password v-model="sifra1"></td>
          </tr>
          <tr>
            <td>
              <h4>ŠIFRA: </h4>
            </td>
            <td><input type=password v-model="sifra2"></td>
          </tr>
          <tr>
            <td>
              <h4>IME: </h4>
            </td>
            <td><input type=text v-model="ime"></td>
          </tr>
          <tr>
            <td>
              <h4>PREZIME: </h4>
            </td>
            <td><input type=text v-model="prezime"></td>
          </tr>
          <tr>
            <td>
              <h4>ADRESA: </h4>
            </td>
            <td><input type=text v-model="adresa"></td>
          </tr>
          <tr>
            <td>
              <h4>BR. TEL: </h4>
            </td>
            <td><input type=text v-model="tel"></td>
          </tr>
          <tr>
            <td>
              <h4>E-MEJL: </h4>
            </td>
            <td><input type=text v-model="mejl"></td>
          </tr>
          <tr>
            <td>
              <button @click="registracija()" type="button" class="btn btn-light  btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>REGISTRUJ SE</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <modal name='registracijaModal'>
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
  import korisnici from '../data/korisnici'

  export default  {
    name: 'registracija',
    props: [],
    mounted () {
      
    },
    data () {
      return {
        korisnicko_ime: '',
        sifra1: '',
        sifra2: '',
        ime: '',
        prezime: '',
        adresa: '',
        tel: '',
        mejl: '',
        mojikorisnici: korisnici,
        greskaPoruka: ''
      }
    },
    methods: {
      registracija(){
        if(localStorage.getItem('korisniciStor')==null){
          localStorage.setItem('korisniciStor', JSON.stringify(this.mojikorisnici));
        }
        else{
          this.mojikorisnici = JSON.parse(localStorage.getItem('korisniciStor'));
        }

        if(this.korisnicko_ime == '' || this.sifra1 == '' || this.sifra2 == '' || this.ime == '' || this.prezime == '' || this.adresa == '' || this.tel == '' || this.mejl == ''){
          this.greskaPoruka = 'POPUNITI SVA POLJA!'
          this.$modal.show('registracijaModal');
          return
        }
        var maxID = this.mojikorisnici[this.mojikorisnici.length-1].korisnik_id + 1;
        if(this.sifra1==this.sifra2)
        {
          this.mojikorisnici.push({
                                    'korisnik_id': maxID,
                                    'ime': this.ime,
                                    'prezime': this.prezime,
                                    'adresa': this.adresa,
                                    'tel': this.tel,
                                    'mejl': this.mejl,                                  
                                    'korisnicko_ime': this.korisnicko_ime,
                                    'sifra': this.sifra1,
                                    'tip': 'kupac'});
          localStorage.setItem('korisniciStor', JSON.stringify(this.mojikorisnici))

          this.$router.push('prijava');
        }
        else{
          //alert("Pogresno ponovljena sifra!")
          this.greskaPoruka = 'POGREŠNO PONOVLJENA ŠIFRA!'
          this.$modal.show('registracijaModal');
        }
      },
      zatvori(){
        this.$modal.hide('registracijaModal')
      }
    },
    computed: {

    }
}


</script>

<style>
  .registracija {

  }
</style>
