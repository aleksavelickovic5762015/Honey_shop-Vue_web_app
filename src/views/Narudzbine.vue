<template lang="html">

  <section class="narudzbine">

    <table class='center'>
      <tr v-for="red in proizvodiNarudzbineChunked">
        <td v-for="n in red" style="width:450px">
          <div class='card border-0'>
            <div class='card-content'>
              <table>
                <tr>
                  <td>
                    <h2 style="color: #ffcc00 !important;">{{n.status}}</h2>
                    <h5 v-if="n.status=='POTVRĐENO'" >BR.DANA: {{n.br_dana}}</h5>
                    <div v-for='(ime, j) in n.nazivi'>
                      <h5>{{ime}}: {{n.kolicine[j]}} kom.</h5>
                    </div>
                    <h5 style="color: #ffcc00 !important;">{{ n.iznos }}</h5>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="js">

  import narudzbine from '../data/narudzbine'
  import proizvodi from '../data/proizvodi'

  export default  {
    name: 'narudzbine',
    props: [],
    mounted () {
      var korisnik_idStor = JSON.parse(localStorage.getItem('prijavljenStor'));
      this.mojkorisnik = this.mojikorisnici.find(korisnik=> korisnik.korisnik_id==korisnik_idStor)
      //////////////////////////////////////////////////
      //narudzbineStor
      if(localStorage.getItem('narudzbineStor')==null){
        localStorage.setItem('narudzbineStor', JSON.stringify(this.narudzbine));
      }
      else{
        this.narudzbine = JSON.parse(localStorage.getItem('narudzbineStor'));
      }
      ///
      //proizvodiStor
      if(localStorage.getItem('proizvodiStor')==null){
        localStorage.setItem('proizvodiStor', JSON.stringify(this.proizvodi));
      }
      else{
        this.proizvodi = JSON.parse(localStorage.getItem('proizvodiStor'));
      }
      /////

      this.narudzbine.forEach((n,i) => {
        //
        var nazivi = []
        var kolicine = []
        //
        if(n.korisnik_id == korisnik_idStor){
          n.proizvod_ids.forEach((p_id, j) => {          
            var proizvodiN = this.proizvodi.find(proizvod=> proizvod.proizvod_id == p_id)
            
            nazivi.push(proizvodiN.naziv)
            kolicine.push(n.kolicine[j])
          });

          var narudzbinaN = {
            'narudzbina_id': n.narudzbina_id,
            'nazivi': nazivi,
            'kolicine': kolicine,
            'iznos': n.iznos,
            'status': n.status,
            'br_dana': n.br_dana};
          //  
          this.proizvodiNarudzbine.push(narudzbinaN);
        }
      });
      
      //alert(JSON.stringify(this.proizvodiNarudzbine))
    },
    data () {
      return {
        proizvodi: proizvodi,
        narudzbine: narudzbine,
        proizvodiNarudzbine: [],
        //
        mojikorisnici: JSON.parse(localStorage.getItem('korisniciStor')),
        mojkorisnik: {}
      }
    },
    methods: {

    },
    computed: {
      proizvodiNarudzbineChunked(){
        var red = []
        var lista = []
        this.proizvodiNarudzbine.forEach((e,i) => {
          red.push(e)
          if((i+1) % 2 == 0 || (i+1) == this.proizvodiNarudzbine.length){
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
  .narudzbine {

  }
</style>
