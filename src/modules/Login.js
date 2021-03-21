import Vue from 'vue'

export default{
	namespaced: true,
	state:{
		login:false,
		datosUsuario:[],
		sistemas:[],
		auth: true,

	},

	mutations:{
		LOGEADO(state, value){
			state.login = value
		},
		DATOS_USUARIO(state, datosUsuario){
      state.datosUsuario = datosUsuario
		},
		SISTEMAS(state, data){
			state.sistemas = data
		},
		AUTHENTICAR(state, value){
			// console.log('autenticar', value)
			state.auth = value
		},

		SALIR(state){
			state.login = false;
			state.datosUsuario = [];
		}
	},

	actions:{
    
    IniciarSesion({commit, dispatch}, payload){
			return new Promise((resolve, reject) => {
			  Vue.http.post('iniciar.sesion.integral', payload).then(response =>{
          // localStorage.setItem("KeyLogger", JSON.stringify(response.body[1].keylogger))
						localStorage.setItem("KeyLogger", response.body[1].keylogger)
						const payload = new Object();
                    payload.id       = response.body[2].id
                    payload.sistema  = 0
						dispatch('ObtenerDatosUsuario', payload);
            // commit('SISTEMAS', response.body[0]);
						resolve(true)
			  }).catch((error)=>{
					reject(error)
				})
			})
		},

		Authologin({commit},usuario){
			return new Promise((resolve) => {
				commit('AUTHENTICAR', false)
				commit('LOGEADO', true);
				commit('DATOS_USUARIO', usuario );
				resolve(true)
			})
		},

		validaSession(){
			return new Promise((resolve, reject) => {
				const payload = new Object();
              payload.id = localStorage.getItem("KeyLogger")

				Vue.http.post('valida.sesion.activa', payload).then(response =>{
					resolve(response.body[0])
				}).catch( error =>{
					console.log('valida error', error.body)
					reject(error)
				})
			});
		},

		ObtenerDatosUsuario({commit},payload){
			return new Promise((resolve, reject) => {
				Vue.http.post('obtener.datos.usuario',payload ).then(response =>{
					resolve(response.body.datosUsuario)
					commit('DATOS_USUARIO', response.body.datosUsuario );
					commit('SISTEMAS'     , response.body.sistemas);
					commit('LOGEADO', true);
				}).catch( error =>{
					console.log('users error', error.body)
					reject(error)
				})	
			});
			
		},


		authenticar({commit}, estatus){
			commit('AUTHENTICAR', estatus)
		},
		salirLogin({commit}){
			commit('AUTHENTICAR', true)
			commit('SALIR');

			const payload = new Object();
						payload.id = localStorage.getItem("KeyLogger");
			Vue.http.post('cerrar.sesion', payload ).then( res =>{
				// console.log('SE CERRO CON EXITO');
			})
		},
	},

	getters:{
		getLogeado(state){
		  return state.login
		},
		getdatosUsuario(state){
			return state.datosUsuario
		},
		auth(state){
			return state.auth;
		},

		getSistemas(state){
			return state.sistemas;
		}
	

	}
}