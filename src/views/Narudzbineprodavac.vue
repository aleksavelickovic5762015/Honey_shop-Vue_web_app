<template lang="html">

  <section class="narudzbineprodavac">
    <!--<div class='row'>
      <div class='col-sm-5' v-for='(n, i) in proizvodiNarudzbine'>
        <div class='card border-0'>
          <div class='card-content'>
            <table class='center'>
              <tr>
                <td>
                  <h4 style="color: #ffcc00 !important;">{{n.status}}</h4>
                  <span v-if="n.status=='POTVRĐENO'" class='span1' style="color: #ffcc00 !important;">BR.DANA: {{n.br_dana}}</span>
                  <div v-for='(ime, j) in n.nazivi'>
                    <span class='span1'>{{ime}}: {{n.kolicine[j]}} kom.</span></br>
                  </div>
                  <span class='span1' style="color: #ffcc00 !important;">{{ n.iznos }}</span></br>
                  <div v-if="n.status=='U TOKU'">
                    <button @click="potvrdiN(i)" type="button" class="btn btn-light btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>POTVRDI</button>&ensp;&ensp;
                    <span class='span1'>BR.DANA: </span><input type=number v-model='proizvodiNarudzbine[i].br_dana' style="width:50px; text-align:center; background-color: #ffcc00;"><br/>
                    <button @click="odbijN(i)" type="button" class="btn btn-light btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ODBIJ</button>
                  </div>
                  <div v-if="n.status=='POTVRĐENO'">
                    <button @click="izvrsiN(i)" type="button" class="btn btn-light btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>IZVRŠENO</button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>-->

    <table class='center'>
      <tr v-for="red in proizvodiNarudzbineChunked">
        <td v-for="n in red" style="width:450px">
          </br></br>
          <div class='card border-0'>
            <div class='card-content'>
              <table>
                <tr>
                  <td>
                    <h2 style="color: #ffcc00 !important;">{{n[0].status}}</h2>
                    <h5 v-if="n[0].status=='POTVRĐENO'" style="color: #ffcc00 !important;">BR.DANA: {{n[0].br_dana}}</h5>
                    <div v-for='(ime, j) in n[0].nazivi'>
                      <h5>{{ime}}: {{n[0].kolicine[j]}} kom.</h5>
                    </div>
                    <h5 style="color: #ffcc00 !important;">{{ n[0].iznos }}</h5>
                    <div v-if="n[0].status=='U TOKU'">
                      </br>
                      <button @click="potvrdiN(n[1])" type="button" class="btn btn-light btn-sm" style='width: 100px; margin-bottom: 5px;font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>POTVRDI</button>&ensp;&ensp;
                      <span class='span1'>BR.DANA: </span><input type=number min="1" v-model='proizvodiNarudzbine[n[1]].br_dana' style="width:50px; text-align:center; background-color: #ffcc00;"></br>
                      <button @click="odbijN(n[1])" type="button" class="btn btn-light btn-sm" style='width: 100px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ODBIJ</button>
                    </div>
                    <div v-if="n[0].status=='POTVRĐENO'">
                      <button @click="izvrsiN(n[1])" type="button" class="btn btn-light btn-sm" style='font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>IZVRŠENO</button>
                    </div>
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
    name: 'narudzbineprodavac',
    props: [],
    mounted () {
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
      var korisnik_idStor = JSON.parse(localStorage.getItem('prijavljenStor'));
      this.mojkorisnik = this.mojikorisnici.find(korisnik=> korisnik.korisnik_id==korisnik_idStor)
      //////////////////////////////////////////////////

      this.narudzbine.forEach((n,i) => {
        //
        var nazivi = []
        var kolicine = []
        //
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
        this.proizvodiNarudzbine.push(JSON.parse(JSON.stringify(narudzbinaN)));
      });

      //alert(JSON.stringify(this.brojDana))
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
    watch:{
      proizvodiNarudzbine: {
        handler(){
          console.log("promenilo se")
        },
        //imediate: true,
        deep: true
      }
    },
    methods: {
      potvrdiN(i){
        this.narudzbine.forEach((n,j) => {
          if(n.narudzbina_id == this.proizvodiNarudzbine[i].narudzbina_id){
            this.narudzbine[j].status = 'POTVRĐENO'
            this.proizvodiNarudzbine[j].status = 'POTVRĐENO'
            this.narudzbine[j].br_dana = this.proizvodiNarudzbine[i].br_dana
          }
        });

        localStorage.setItem('narudzbineStor', JSON.stringify(this.narudzbine));

        //location.reload()
      },
      odbijN(i){
        this.narudzbine.forEach((n,j) => {
          if(n.narudzbina_id == this.proizvodiNarudzbine[i].narudzbina_id){
            this.narudzbine[j].status = 'ODBIJENO'
            this.proizvodiNarudzbine[j].status = 'ODBIJENO'
            //this.narudzbine[j].br_dana = 0
          }
        });

        localStorage.setItem('narudzbineStor', JSON.stringify(this.narudzbine));

        //location.reload()
      },
      izvrsiN(i){
        this.narudzbine.forEach((n,j) => {
          if(n.narudzbina_id == this.proizvodiNarudzbine[i].narudzbina_id){
            this.narudzbine[j].status = 'IZVRŠENO'
            this.proizvodiNarudzbine[j].status = 'IZVRŠENO'
            //this.narudzbine[j].br_dana = 0
            //this.proizvodiNarudzbine[j].br_dana = 0
          }
        });

        localStorage.setItem('narudzbineStor', JSON.stringify(this.narudzbine));

        //location.reload()
      }
    },
    computed: {
      proizvodiNarudzbineChunked(){
        var red = []
        var lista = []
        this.proizvodiNarudzbine.forEach((e,i) => {
          red.push([e,i])
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
  .narudzbineprodavac {

  }
</style>
