import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VeeValidate from 'vee-validate';

//import 'bootstrap/dist/css/bootstrap.css';

// register the module/plugin in the global view object
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);

const router = new VueRouter({ 
  routes,
  mode: 'history'
})

Vue.http.options.root = 'http://localhost:3000';
//Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';



/*           Interceptors          */
/* Vue.http.interceptors.push((req, next) => {

  // it is possible to put informations in the header before sending the request
  // é possível colocar informações no header antes do envio da requisição
  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    // it is possible to access the response data and do something before.
    // é possível acessar os dados da resposta e realizar transformações antes
    console.log(res.body);
  });

}); */



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
