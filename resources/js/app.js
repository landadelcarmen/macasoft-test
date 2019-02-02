require('./bootstrap');
window.Vue = require('vue');

import VueRouter from 'vue-router';
import VModal from 'vue-js-modal';
import { routes } from './routes.js';
import { guards } from './guards.js'

Vue.use(VueRouter);
Vue.use(VModal);

const router = new VueRouter({ mode: 'history', routes, });

router.beforeEach( guards );

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
