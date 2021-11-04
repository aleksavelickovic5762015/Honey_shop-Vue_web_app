<template lang="html">

  <section class="proizvodizmena">
    </br>
    <div class='card border-0'>
      <div class='card-content'>
        <table class='center'>
          <tr>
            <!--<td style="width:270px"><img :src="'/slike/proizvod'+mojproizvod.proizvod_id+'.jpg'" width='200px'></td>-->
            <td style="width:270px"><img :src="mojproizvod.slika" width='200px'></td>
            <td>
              <table class='center'>
                <tr>
                  <td>
                    <h4>NAZIV: </h4>
                  </td>
                  <td><input type=text v-model="mojproizvod.naziv"></td>
                </tr>
                <tr>
                  <td>
                    <h4>CENA: </h4>
                  </td>
                  <td><input type=text v-model="mojproizvod.cena"></td>
                </tr>
                <tr>
                  <td>
                    <h4>KATEGORIJA: </h4>
                  </td>
                  <td>
                    <input type=text v-model="mojproizvod.kategorija" list="exampleList">
                    <datalist id="exampleList">
                      <option v-for='kt in pKategorije' :value="kt"></option>
                    </datalist>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>OPIS: </h4>
                  </td>
                  <td><input type=text v-model="mojproizvod.opis"></td>
                </tr>
                <tr>
                  <td>
                    <h4>NAČIN KORIŠĆENJA: </h4>
                  </td>
                  <td><input type=text v-model="mojproizvod.nacinKoriscenja"></td>
                </tr>
                <tr>
                <tr>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <span class='span1'>IZMENI SLIKU:</span></br>
              <input @change="uploadImage" type="file" style='font-family: "Lucida Console", "Courier New", monospace;' name="photo" accept="image/*">
            </td>
            <td>
              <button @click="izmena" type="button" class="btn btn-light  btn-sm" style='width:100px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>IZMENI</button>&ensp;&ensp;
              <button @click="odustani" type="button" class="btn btn-light  btn-sm" style='width:100px; font-family: "Lucida Console", "Courier New", monospace;font-weight: bold;'>ODUSTANI</button>            
            </td>
          </tr>
          <tr>
            <td style="width:270px">
              <!--<img :src="imageSrc" class="image" width='200px'>-->
            </td>
          </tr>
        </table>
      </div>
    </div>

    <modal name='proizvodizmenaModal'>
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

  import proizvodi from '../data/proizvodi'
  
  export default  {
    name: 'proizvodizmena',
    props: [],
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
      var id = Number(this.$route.params.id);
      this.mojproizvod = this.proizvodi.find(proizvod=>proizvod.proizvod_id==id);
      //this.mojproizvod = JSON.parse(JSON.stringify(this.proizvodi.find(proizvod=>proizvod.proizvod_id==id)));
      this.mojproizvodStari = JSON.parse(JSON.stringify(this.mojproizvod))

      //
      this.index = this.proizvodi.indexOf(this.mojproizvod)
    },
    data () {
      return {
        proizvodi: proizvodi,
        index: 0,
        mojproizvod: {},
        mojproizvodStari: {},
        staraSlika: null,
        novaSlika: null,
        pKategorije: [],
        greskaPoruka: ''
      }
    },
    methods: {
      izmena(){
        if(this.mojproizvod.naziv == '' || this.mojproizvod.cena == '' || this.mojproizvod.kategorija == '' ||
           this.mojproizvod.opis == '' || this.mojproizvod.nacinKoriscenja == '' || this.mojproizvod.slika == ''){
          this.greskaPoruka = 'POPUNITI SVA POLJA!'
          this.$modal.show('proizvodizmenaModal');
          return
        }
        if(isNaN(this.mojproizvod.cena)){
          this.greskaPoruka = 'CENA NIJE BROJ!'
          this.$modal.show('proizvodizmenaModal');
          return
        }
        //alert(JSON.stringify(this.mojproizvod))
        this.proizvodi[this.index] = this.mojproizvod
        //
        localStorage.setItem('proizvodiStor', JSON.stringify(this.proizvodi));
        //
        this.$router.push('/proizvodinfo/' + this.mojproizvod.proizvod_id);
      },
      odustani(){
        if(this.staraSlika){
          //this.mojproizvod["slika"] = this.staraSlika
          //this.proizvodi[this.index] = this.mojproizvod
          //this.proizvodi[this.index].slika = this.staraSlika
          this.proizvodi[this.index] = this.mojproizvodStari
          localStorage.setItem('proizvodiStor', JSON.stringify(this.proizvodi));
        }
        //
        this.$router.push('/proizvodinfo/' + this.mojproizvod.proizvod_id);
      },
      //
      uploadImage() {    
        var file = document
          .querySelector('input[type=file]')
          .files[0];
        var reader = new FileReader();
        //
        var vm = this
        //
        vm.staraSlika = vm.mojproizvod["slika"]
        //
        reader.onload = function(e) {
          if(e.target.result.includes('image/jpeg') || e.target.result.includes('image/png')){
            vm.novaSlika = e.target.result
            ////////////////
            vm.mojproizvod["slika"] = vm.novaSlika
            vm.proizvodi[vm.index] = vm.mojproizvod
            localStorage.setItem('proizvodiStor', JSON.stringify(vm.proizvodi));
          }
          else{
            vm.greskaPoruka = 'UNETA DATOTEKA NIJE SLIKA!'
            vm.$modal.show('proizvodizmenaModal');
          }
        };
        reader.onerror = function(error) {
          alert(error);
        };
        reader.readAsDataURL(file);      
      },
      zatvori(){
        this.$modal.hide('proizvodizmenaModal')
      }
    },
    computed: {

    }
}


</script>

<style>
  .proizvodizmena {

  }
</style>
