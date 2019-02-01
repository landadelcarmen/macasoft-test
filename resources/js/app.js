
require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Page404 from './components/Page404';
import LoginForm from './components/LoginForm';
import UsersShow from './components/UsersShow';
import UsersIndex from './components/UsersIndex';
import UsersCreateForm from './components/UsersCreateForm';

const routes = [

    { path: '/login', component: LoginForm },

    { path: '/usuarios', component: UsersIndex },

    { path: '/usuarios/nuevo', component: UsersCreateForm },

    { path: '/usuarios/:user_id', component: UsersShow},

    { path: '*', component: Page404 }

];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {

    let token = localStorage.token;
    let user = localStorage.user;


    if(to.path == '/') {

        if(!token) {
            return next({ path: '/login'})
        }

        if(token && JSON.parse(user).role !== 3) {
            return next({ path: '/usuarios'})
        }

        if(token && JSON.parse(user).role === 3) {
            return next({ path: `/usuarios/${JSON.parse(user).id}`})
        }

    }

    if(to.path == '/login') {
        if(token && JSON.parse(user).role !== 3) {
            return next({ path: '/usuarios'})
        }
        if(token && JSON.parse(user).role === 3) {
            return next({ path: `/usuarios/${JSON.parse(user).id}`})
        } else {
            return next();
        }
    }

    if(to.path == '/usuarios') {
        if(token && JSON.parse(user).role === 3) {
            return next({ path: '/pagina-no-encontrada'})
        } else {
            return next();
        }
    }

    return next();

});

const app = new Vue({
    router,

    methods: {
        role(role) {
            if ( role === 1) {
                return 'administrador';
            }

            if ( role === 2 ) {
                return 'vendedor';
            }

            return 'usuario';
        },

        isAuthenticated() {
            return localStorage.getItem('token');
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
        }
    }
}).$mount('#app')
