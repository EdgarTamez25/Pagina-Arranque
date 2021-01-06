<template>
  <v-app id="contenedor">
    <v-container >
      <v-row justify="right">
        
        <v-col cols="12">
          <v-card-actions>
            <v-card-title class="font-weight-bold headling-1 white--text">
              PROYECTOS GAMA
            </v-card-title>

            <v-spacer></v-spacer>
            <span>
              <v-img src="logo.png" height="70px" width="100px" contain/>
            </span>
          </v-card-actions>
        </v-col>

        <v-col cols="12"  sm="6" md="4" lg="3" xl="2" v-for="control in AppControl" :key="control.id" >
          <a :href="control.path" style="text-decoration: none">
            <v-card class="elevation-14 pa-1" shaped v-ripple  height="100%">
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
                <v-card-text class="font-weight-black text-h6" align="center">
                   {{ control.nombre}} 
                </v-card-text>

              </v-card-text>
            </v-card>
          </a>
          
        </v-col>

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
      </v-row>
  </v-container>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    loading: true,
    AppControl:[]
  }),

  created(){
    this.consultaModulos();
  },

  methods:{
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

<style scoped>
  
  #contenedor{
    background: #12c2e9;  
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); 
  }
 
</style>