export function guards(to, from, next) {

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

}