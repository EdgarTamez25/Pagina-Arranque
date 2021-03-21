<template>
  <v-app id="contenedor">

    <v-snackbar v-model="alerta.activo" multi-line :vertical="alerta.vertical" top right :color="alerta.color" > 
      <strong> {{alerta.texto}} </strong>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text @click="alerta.activo = false" v-bind="attrs"> Cerrar </v-btn>
      </template>
    </v-snackbar>

    <v-main id="fondo">
      <v-slide-y-transition mode="out-in">
        <!-- <router-view/> -->
        <Login v-if="!getLogeado"/>
        <Home v-else/>
      </v-slide-y-transition>
    </v-main>

    <v-overlay v-if="blocked">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Login from '@/views/Login.vue'
import Home  from '@/views/Home.vue'

export default {
  components: {
			Login,
      Home
	},
  data: () => ({
    loading: true,
    AppControl:[],
    alerta: { activo: false, texto:'', color:'error', vertical:true },
    overlay: false,
    blocked: true,

  }),
  

  created(){
    let that = this
    // this.overlay = true;
    if (typeof(Storage) !== "undefined") {
        // VERIFICO SI EXISTE UN USUARIO ACTIVO 
        if(localStorage.getItem("KeyLogger") != null){
          this.validaSession().then( response =>{ // VERIFICO SI LA SESSION DEL KEYLOGGER ESTA ACTIVA
            const payload = new Object();
                    payload.id       = response.id_usuario
                    payload.sistema  = 0

            this.ObtenerDatosUsuario(payload).then(response =>{
              this.alerta = { activo: true,texto: `HOLA DE NUEVO ${ response.nombre }`, color:'success', vertical:true };
              setTimeout(()=>{ that.blocked = false; }, 1000);

            }).catch( error=>{ // OBTENGO LA INFORMACION DEL USUARIO
              this.alerta = { activo: true, texto: error.bodyText, color:'error', vertical:true }
              // console.log('ERROR DATOS')
            }).finally(()=> { 
              setTimeout(()=>{ that.blocked = false; }, 1000);
            });  

          }).catch( error =>{
            this.alerta = { activo: true, texto: error.bodyText, color:'error', vertical:true }
            // this.$router.push({ name: 'Login' });         // SI ES DIFERENTE ENRUTO A PAGINA ARRANQUE
          }).finally(()=> { 
            setTimeout(()=>{ that.blocked = false; }, 1000);
          });

          // if(this.$router.currentRoute.name != 'pagina-arranque'){  // COMPARO LA RUTA EN LA QUE ME ENCUENTRO 
          //   this.blocked = false;
          //   // this.$router.push({ name: 'pagina-arranque' });         // SI ES DIFERENTE ENRUTO A PAGINA ARRANQUE
          // }
        }else{ 
            // console.log('ELSE KEYLOG')
          //  if(this.$router.currentRoute.name != 'Login'){  // COMPARO LA RUTA EN LA QUE ME ENCUENTRO 
            this.blocked = false;
          //   // this.$router.push({ name: 'Login' });         // SI ES DIFERENTE ENRUTO A PAGINA ARRANQUE
          // }
        }

    } else {
      this.alerta = { activo: true, texto:'Este navegador no es compatible con el sistema.', color:'error', vertical:true }
      // this.$router.push({ name: 'Login' });
    }

  },

  computed:{ ...mapGetters('Login',['getLogeado']) },

  methods:{
    ...mapActions('Login',['ObtenerDatosUsuario','validaSession']),

    consultaModulos(){
      this.$http.get('gama.etiquetas').then(response =>{
        this.AppControl = response.body
      }).catch(err =>{
        console.log('err', err.body)
      }).finally(()=>{
        this.loading = false;
      })
    }
  }
};
</script>
