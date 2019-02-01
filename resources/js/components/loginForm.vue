<template>
    <form @submit.prevent="submit" @input="error = null" class="card w-1/3">
        <transition name="fade" appear>
            <div class="bg-red-lighter text-red-darker text-lg p-2 mb-4 rounded shadow-sm" v-if="error" v-text="error"></div>
        </transition>

        <div class="mb-4 flex justify-center items-center">
            <img src="http://macasoft.com/assets/img/logo.png" alt="Macasoft" class="w-1/2 h-auto">
        </div>

        <input
            placeholder="Correo Electrónico"
            class="form-input"
            type="email"
            name="email"
            v-model="email"
        >
        <input
            placeholder="Contraseña"
            class="form-input"
            type="password"
            name="password"
            v-model="password"
        >
        <button class="py-2 hover:shadow w-1/2 text-sm ml-auto bg-blue-dark text-white uppercase rounded-full mt-auto">Iniciar Sesión</button>
    </form>
</template>

<script>
    export default {

        data() {
            return {
                email:null,
                password: null,
                error: null,
            }
        },

        methods: {
            submit() {
                axios.post('/api/login', {
                    email: this.email,
                    password: this.password
                }).then( response => {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    let user = JSON.parse(localStorage.user);
                    if(user.role != 3) {
                        return this.$router.push({ path: '/usuarios' })
                    }
                    this.$router.push({ path: `usuarios/${user.id}` })

                }).catch( error => this.error = error.response.data.error);
            }
        }
    }
</script>