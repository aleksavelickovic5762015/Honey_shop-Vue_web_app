<template lang="html">
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <h1>MEDENJACI</h1>
        <p style="padding-bottom:7%;">NAJBOLJI SRPSKI MED</p>
      </div>
      <div class="section">
        <table class='center'>
          <tr>
            <td style="width:350px"><img src='../assets/kapljica.png' width='300px'></td>
            <td>
              <h2>NAŠ MED</h2>
              <h5>Shvatamo da u osnovi naš med nije naš vlastiti,<br/>
                već je najvredniji dar same prirode.
              </h5>
            </td>
          </tr>
        </table>
      </div>
      <div class="section">
        <table class='center'>
          <tr>
            <td style="width:450px"><img src='../assets/tegla4.png' width='400px'></td>
            <td>
              <h2>NAŠI PROIZVODI</h2>
              <h5>Priroda ne greši. Med pčelarske kuće Medenjaci<br/>
                je savršen u svom najprirodnijem obliku i naš<br/>
                je posao da tako i ostane.<br/>
                Shvatamo da biti najbolji znači pružiti najbolje.<br/>
                Briga o svom telu, porodici, okolini i to<br/>
                uz podršku meda naše kuće.<br/>
              </h5>
            </td>
          </tr>
        </table>
      </div>
    </full-page>
  </div>
</template>

<script lang="js">
  import navigation from '../components/Navigation'

  export default  {
    name: 'pocetna',
    components:{
      navigation
    },
    props: [],
    mounted () {

    },
    data () {
      return {
        options: {
          navigation: true
        }
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>


<style>
  body{
    background-image: url("../assets/pozadina.jpg");
    background-size: cover !important;
    background-repeat: no-repeat !important;
    
    background-color: #282828 !important;
  }
  p,h2,h4,h5,span{
    font-family: "Lucida Console", "Courier New", monospace;
    color: white !important;
  }
  h1{
    font-family: "Lucida Console", "Courier New", monospace;
    font-weight: bold;
    color: white !important;
  }
  span{
    background: white !important;
  }
  td {
    text-align: left;
  }

  .center {
    margin-left: auto;
    margin-right: auto;
  }
  .pocetna {
    
  }
</style>
