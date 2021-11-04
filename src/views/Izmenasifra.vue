<template lang="html">

  <section class="izmenasifra">
    <div class='card border-0'>
      <div class='card-content'>
        <table class='center'>
          <tr>
            <td>
              <h4>SIFRA: </h4>
            </td>
            <td><input type=password v-model="staraSifra"></td>
          </tr>
          <tr>
            <td>
              <h4>NOVA SIFRA: </h4>
            </td>
            <td><input type=password v-model="novaSifra1"></td>
          </tr>
          <tr>
            <td>
              <h4>NOVA SIFRA: </h4>
            </td>
            <td><input type=password v-model="novaSifra2"></td>
          </tr>
          <tr>
            <td>
              <button @click="izmenasifra" type="button" class="btn btn-light  btn-sm" style='width:100px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>IZMENI</button>
            </td>
            <td>
              <button @click="odustani" type="button" class="btn btn-light  btn-sm" style='width:100px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ODUSTANI</button>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <modal name='izmenasifraModal'>
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
    name: 'izmenasifra',
    props: [],
    mounted () {
      this.mojkorisnik = this.mojikorisnici.find(korisnik=> korisnik.korisnik_id==this.korisnik_idStor)
    },
    data () {
      return {
        staraSifra: '',
        novaSifra1: '',
        novaSifra2: '',
        mojikorisnici: JSON.parse(localStorage.getItem('korisniciStor')),
        korisnik_idStor: JSON.parse(localStorage.getItem('prijavljenStor')),
        mojkorisnik: {},
        greskaPoruka: ''
      }
    },
    methods: {
      izmenasifra(){
        if(this.staraSifra == '' || this.novaSifra1 == '' || this.novaSifra2 == ''){
          this.greskaPoruka = 'POPUNITI SVA POLJA!'
          this.$modal.show('izmenasifraModal');
          return
        }
        
        if(this.staraSifra == this.mojkorisnik.sifra){
          if(this.novaSifra1 == this.novaSifra2){
            this.mojikorisnici[this.korisnik_idStor].sifra = this.novaSifra1;
            localStorage.setItem('korisniciStor', JSON.stringify(this.mojikorisnici))

            this.$router.push('podaci');
          }
          else{
            //alert("Ispravno ponoviti novu sifru!")
            this.greskaPoruka = 'NEISPRAVNO PONOVLJENA ŠIFRA!'
            this.$modal.show('izmenasifraModal');
          }
        }
        else{
          //alert("Pogresna sifra!")
          this.greskaPoruka = 'POGREŠNA ŠIFRA!'
          this.$modal.show('izmenasifraModal');
        }
      },
      odustani(){
        this.$router.push('podaci');
      },
      zatvori(){
        this.$modal.hide('izmenasifraModal')
      }
    },
    computed: {

    }
}


</script>

<style>
  .izmenasifra {

  }
</style>
