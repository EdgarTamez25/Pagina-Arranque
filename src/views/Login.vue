<template>

  <v-container>

    <v-snackbar v-model="alerta.activo" multi-line vertical top right :color="alerta.color" > 
      <strong> {{alerta.texto}} </strong>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text @click="alerta.activo = false" v-bind="attrs"> Cerrar </v-btn>
      </template>
    </v-snackbar>

    <v-overlay v-model="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>


    <!-- <v-row id="padre" :style="{height: tamanioDisplay+'px;'}"> -->
    <v-row id="padre" v-bind:style="{ height: tamanioDisplay + 'px' }">
      <v-col cols="12" align-self="center">
        <v-row justify="center">
          <v-col cols="12"  sm="5"  lg="5"  xl="4" v-if="tamanio === 'md' || tamanio ==='lg' || tamanio === 'xl' ">
            <v-card class="elevation-0 transparent" >
              <v-card-text class="mt-2" align="center">
                <v-img
                  id="img"
                  src="logo.png"
                  width="100%" 
                  contain
                  max-height="500"
                >
                </v-img>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4"  xl="3" v-else>
            <v-card class="elevation-0
             transparent">
              <v-card-text class="mt-2" align="center">
                <v-img
                  id="img"
                  src="desarrolloDigital.png"
                  height="100px"
                  width="300px"
                  contain
                >
                </v-img>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12"  sm="7" lg="5" xl="4" v-if="tamanio!= 'xs' ">
            <v-card  class="transparent elevation-0" width="100%" height="100%" style="border-radius: 0px;">
                <v-card-text class="px-6">
                  <v-img  src="desarrolloDigital.png" max-height="100" contain v-if=" tamanio== 'md' || tamanio== 'lg' || tamanio== 'xl'"></v-img>
                  <br/>
                  <v-form 
                    ref="form"
                    v-model="valid"
                    lazy-validation>
                    <v-text-field
                      color="#9d39df"
                      style="border-radius: 15px;"
                      class="headline"
                      autofocus
                      v-model="email" 
                      :rules="[rules.required]"
                      append-icon="mdi-email" 
                      label="Usuario" 
                      required
                      outlined
                      type="text"
                      >
                    </v-text-field>

                    <v-text-field
                      outlined
                      color="#9d39df"
                      style="border-radius: 15px;"
                      class="headline mb-4"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show1 ? 'text' : 'password'"
                      label="contraseña"
                      counter
                      @click:append="show1 = !show1"
                      @keyup.enter="validate"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                
                <v-card-actions class="mx-6 pa-0">
                  <v-spacer></v-spacer>
                  <v-btn  color="#9d39df" dark @click="validate" width="150" class="elevation-5 ">Iniciar Sesión</v-btn>
                  
                </v-card-actions>
                
                <!-- <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="terciario" text  x-small :to="{name: 'olvidacontra'}">Olvide mi contraseña.</v-btn>
                </v-card-actions> -->
                <div  id="texto" align="justify" class="pa-5 caption" v-if=" tamanio== 'lg' || tamanio== 'xl'">
                  Somos una empresa mexicana enfocada 100% en el arte de la impresión con más de 15 años de experiencia. 
                  Dedicados al desarrollo, fabricación y comercialización de procesos flexográficos, offset, impresión digital y gran formato.
                </div> 
                <!-- </v-card-actions>
              </v-img> -->

            </v-card>
          </v-col>

          <v-col cols="12"  sm="6" lg="4" xl="3" v-else>
            <v-card  class="transparent elevation-0" >
                <v-card-text class="px-0">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      color="#9d39df"
                      style="border-radius: 5px;"
                      autofocus
                      v-model="email" 
                      :rules="[rules.required]"
                      append-icon="mdi-email" 
                      label="Usuario" 
                      required
                      outlined
                      type="text"
                      clearable
                      >
                    </v-text-field>

                    <v-text-field
                      color="#9d39df"
                      outlined
                      style="border-radius: 5px;"
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show1 ? 'text' : 'password'"
                      label="contraseña"
                      @keyup.enter="validate"
                      counter
                      @click:append="show1 = !show1"
                      clearable
                      class="mb-4"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="mx-0">
                  <v-spacer></v-spacer>
                  <v-btn  color="#9d39df" block dark @click="validate" width="150" class="elevation-5 ">Iniciar Sesión</v-btn>
                </v-card-actions>
                
                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions> -->
              <!-- </v-img> -->

            </v-card>
          </v-col>
          
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  // const {Base64} = require('js-base64');
  import {mapActions , mapGetters} from 'vuex'
  import store from '@/store'

  export default {
    data(){
      return{
        overlay: false,
        password: '',
        email:'',

        alerta: { activo: false, texto:'', color:'error', vertical:true },

        show1: false,
        error: '',

        value:'',

        valid: true,
        rules: {
          required: value => !!value || 'Requerido.',
          // min: v => (v && v.length <= 10) || 'Minimo 8 caracteres'
        },

        NombreAsig: '',
        Nomuser: '',
        sesion:0,
      }
    },

    created(){
      

    },

    computed:{
      // IMPORTANDO USO DE VUEX - ZONAS (GETTERS)
      ...mapGetters('Login' ,['getLogeado','getdatosUsuario']), 
    },


    methods:{
      ...mapActions('Login',['IniciarSesion']),


      validate () {
        if(this.$refs.form.validate() === true){
          // console.log('true',this.$refs.form.validate())
          this.ingresar()
        }else{
          // console.log('false',this.$refs.form.validate())
          this.alerta = { activo: true, texto:'No puedes omitir ningun campo.', color:'error', vertical:true }
        }
      },

      ingresar (){
        let md5     = require('md5')
        this.overlay = true;
        const payload  = new Object();
              payload.usuario     = this.email;
              payload.contrasenia =  md5(this.password);

        this.IniciarSesion(payload).then( response => {
          // localStorage.setItem("KeyLoger", JSON.stringify(this.getdatosUsuario))
          // this.$router.push({ name: 'pagina-arranque' });
        }).catch(error =>{
          this.alerta = { activo: true, texto: error.bodyText, color:'error', vertical:true }
        }).finally(()=>{
          this.overlay = false;
        })
      },
      
      salir(){
        this.cerrar_sesion= false;
        this.salirLogin()
        this.$store.dispatch("salir")
      },
      



    },

    computed: {
      
      tamanioDisplay () {
        return this.$vuetify.breakpoint.height - 100
      },

      tamanio () {
        return this.$vuetify.breakpoint.name
        
      },
      
    },
  };


</script>



<style>

  .hijo {
    /* IMPORTANTE */
    display: table-cell;
    vertical-align: middle;
  }

  #imagenLogoSof{
    position:absolute; /*El div será ubicado con relación a la pantalla*/
    top:40px;
    left:0px; /*A la derecha deje un espacio de 0px*/
    right:0px; /*A la izquierda deje un espacio de 0px*/
    bottom:0px; /*Abajo deje un espacio de 0px*/
  }

  #texto{
    position:absolute; /*El div será ubicado con relación a la pantalla*/
    left:0px; /*A la derecha deje un espacio de 0px*/
    right:0px; /*A la izquierda deje un espacio de 0px*/
    bottom:0px; /*Abajo deje un espacio de 0px*/
    height:150px; /*alto del div*/
    z-index:0;
  }
</style>


  