import Home from './components/home/Home.vue';
const Register = () => System.import('./components/register/Register.vue');

export const routes = [
    { path: '', name: 'home', component: Home, title: 'Home', menu: true},
    { path: '/register', name: 'register', component: Register, title: 'Register', menu: true },
    { path: '/register/:id', name: 'update', component: Register, title: 'Register', menu: false },
    { path: '*', component: Home, menu: false }
];