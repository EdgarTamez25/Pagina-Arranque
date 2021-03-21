<template>
  <v-main id="contenedor" >
    
    <v-overlay v-if="!getSistemas.length">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

      <v-row  class="pa-4" >
        <v-col cols="12">
          <v-card-actions>
            <!-- <v-card-title class="font-weight-bold headling-1 white--text">
              PROYECTOS GAMA 2
            </v-card-title> -->
            <span>
              <v-img src="desarrolloDigital2.png" height="70px" width="240px" contain/>
            </span>
            <v-spacer></v-spacer>
            <span>
              <v-img src="logo.png" height="70px" width="100px" contain/>
            </span>
          </v-card-actions>
        </v-col>

        <!-- {{ getdatosUsuario[1] }} -->
        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" v-for="control in getSistemas" :key="control.id"  >
          <!-- <a :href='`${ control.path }/${ key } `' style="text-decoration: none"> -->
            <v-card class="elevation-14 pa-1" shaped v-ripple  height="100%" :href="control.path">
              <v-card-text class="mt-2">

                <v-img
                  :src="control.foto"
                  :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                  aspect-ratio="1.5"
                  class=" pa-2 mb-5"
                  width="100%" 
                  height="220px"
                  id="logo"
                  contain
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-card-text class="font-weight-black text-h6 CON" align="center">
                   {{ control.nombre}} 
                </v-card-text>

              </v-card-text>
            </v-card>
          <!-- </a> -->
        </v-col>
        
        <v-btn color="black" dark left absolute fixed bottom @click="cerrar_sesion = true">
          Cerrar Sesión
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>

        <!-- <v-col cols="12" class="mt">-</v-col> -->

        <v-dialog v-model="loading" persistent width="350" >
          <v-card color="amber darken-3" dark >
            <v-card-text class="pa-3 font-weight-black subtitle-1" align="center">
              Cargando información, por favor espere
              <v-progress-linear
                indeterminate
                color="white"
                class="my-3"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>


        <v-dialog v-model="cerrar_sesion" width="400px">
          <v-card color="grey darken-4" class="pa-1" >
            <v-card-title class=" white--text font-weight-medium ">
            ¿Quiere cerrar la sesión?
            </v-card-title>
            <v-card-actions class="mt-6">
              <v-spacer></v-spacer>
              <v-btn color="error" outlined small @click="cerrar_sesion=false" >Cancelar</v-btn>
              <v-btn color="white"  small @click="salir">Cerrar Sesión</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-row>
  </v-main>
</template>

<script>
  import {mapActions , mapGetters} from 'vuex'

  export default {
    name: 'Home',
    data: () =>({
      loading: false,
      cerrar_sesion: false,
      overlay: true,
      key: null,
    }),

    created(){
        if(localStorage.getItem("KeyLogger") === null){
          // console.log('ES  null')
          this.$router.push({ name: 'Login' });
        }else{
          // console.log('NO ES NULO')
          this.key = localStorage.getItem("KeyLogger");
        }
    },


    computed:{
      // IMPORTANDO USO DE VUEX - ZONAS (GETTERS)
      ...mapGetters('Login' ,['getLogeado','getSistemas']), 
    },

    methods:{
      ...mapActions('Login',['Login','salirLogin','authenticar','Authologin']),

      salir(){
        // localStorage.removeItem("rhKey");
        this.cerrar_sesion= false;
        this.salirLogin()
        this.$store.dispatch("salir")

      },
      
    }
  }
</script>


<style scoped>
  #contenedor{
    /* background: #12c2e9;   */
    /* background: #272727;   */

    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); 
    height: 100%;
    width: 100%;
  }
</style>
