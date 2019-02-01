
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

    { path: '/usuarios', component: UsersIndex,  meta: { authenticated: true }},

    { path: '/usuarios/nuevo', component: UsersCreateForm,  meta: { authenticated: true }},

    { path: '/usuarios/:user_id', component: UsersShow ,meta: { authenticated: true }},

    { path: '*', component: Page404 }

];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {

    let token = localStorage.token;
    let user = localStorage.user;

    if(to.meta.authenticated && !token) {
        return next( { path: '/login' });
    }

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

    if(to.path == '/pagina-no-encontrada') {
        return next();
    }

    if(to.path == '/login') {
        if(token && JSON.parse(user).role !== 3) {
            return next({ path: '/usuarios'})
        }
        if(token && JSON.parse(user).role === 3) {
            return next({ path: `/usuarios/${JSON.parse(user).id}`})
        }

        return next();
    }

    if(to.path == '/usuarios') {
        if(token && JSON.parse(user).role === 3) {
            return next({ path: '/pagina-no-encontrada'})
        }

        return next();
    }

    if(to.path == '/usuarios/nuevo') {
        if(token && JSON.parse(user).role === 1) {
            return next();
        }

        return next({ path: '/pagina-no-encontrada'})

    }

    if(to.params.user_id != JSON.parse(user).id && JSON.parse(user).role == 3) {

        return next({ path: '/pagina-no-encontrada'});

    }

    return next();

});

const app = new Vue({
    router,

    computed: {
        isAdmin() {
            return JSON.parse(localStorage.user).role == 1;
        },

        isAuthenticated() {
            return localStorage.getItem('token');
        },

    },

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

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
        }
    }
}).$mount('#app')
