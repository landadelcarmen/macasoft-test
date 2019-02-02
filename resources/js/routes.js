import Page404 from './components/Page404';
import LoginForm from './components/LoginForm';
import UsersShow from './components/UsersShow';
import UsersIndex from './components/UsersIndex';
import UsersCreateForm from './components/UsersCreateForm';

export const routes = [

    { path: '/login', component: LoginForm },

    { path: '/usuarios', component: UsersIndex,  meta: { authenticated: true }},

    { path: '/usuarios/nuevo', component: UsersCreateForm,  meta: { authenticated: true }},

    { path: '/usuarios/:user_id', component: UsersShow ,meta: { authenticated: true }},

    { path: '*', component: Page404 }

];
