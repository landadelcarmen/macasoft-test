<template>
    <form @submit.prevent="submit" @input="errors = {}" class="card">

        <h2 class="pb-4 flex justify-between items-center">
            Nuevo Usuario

        </h2>

        <div class="flex -mx-2">
            <div class="w-1/2 px-2">
                <input
                    placeholder="Nombre"
                    class="form-input"
                    type="text"
                    name="name"
                    v-model="name"
                >
                <small v-for="error in errors.name" v-text="error"></small>
            </div>

            <div class="w-1/2 px-2">
                <select
                    name="role"
                    v-model="role"
                    id="role"
                    class="form-input"
                >
                    <option value="0" disabled>Rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Vendedor</option>
                    <option value="3">Usuario</option>
                </select>
                <small v-for="error in errors.role" v-text="error"></small>
            </div>
        </div>

        <div class="flex -mx-2">
            <div class="w-1/2 px-2 flex justify-center">
                <div class="rounded-full h-48 w-48 border-blue-dark border-2 flex justify-center items-center overflow-hidden">
                    <transition name="fade" mode="out-in">
                        <div v-if="!avatar">
                            <label for="avatar" class="cursor-pointer font-bold text-blue-dark text-sm hover:underline text-center inline-block">
                                Agregar<br>Foto de Perfil
                            </label>
                            <input type="file" accept="image/*" @change="previewAvatar" id="avatar" name="avatar" ref="avatar" class="hidden">
                        </div>
                        <img v-else class="w-auto h-full" :src="avatar.url" alt="avatar">
                        <small v-for="error in errors.avatar" v-text="error"></small>
                    </transition>
                </div>
            </div>

            <div class="w-1/2 px-2">
                <input
                    placeholder="Correo Electrónico"
                    class="form-input"
                    type="email"
                    name="email"
                    v-model="email"
                >
                <small v-for="error in errors.email" v-text="error"></small>

                <input
                    placeholder="Contraseña"
                    class="form-input"
                    type="password"
                    name="password"
                    v-model="password"
                >
                <small v-for="error in errors.password" v-text="error"></small>

                <input
                    placeholder="Confirmar Contraseña"
                    class="form-input"
                    type="password"
                    name="password_confirmation"
                    v-model="password_confirmation"
                >
            </div>
        </div>

        <div class="w-full flex justify-between">
            <button
                @click.prevent="$router.push({path: '/usuarios'})"
                type="button"
                class="focus:outline-none rounded-full py-2 px-4 text-sm text-grey-darker uppercase mt-auto"
            >Cancelar</button>

            <button class="btn mt-auto">Registrar</button>
        </div>

    </form>
</template>

<script>
    export default {
        data() {
            return {
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
                role: 0,
                avatar: null,
                errors: {}
            }
        },

        computed: {
            formData() {
                let formData = new FormData();

                formData.append('name', this.name);
                formData.append('email', this.email);
                formData.append('role', this.role);
                formData.append('password', this.password);
                formData.append('password_confirmation', this.password_confirmation);
                formData.append('avatar', this.avatar);

                return formData;
            }
        },

        methods: {
            previewAvatar() {
                this.$refs.avatar.files[ 0 ].url = URL.createObjectURL(this.$refs.avatar.files[ 0 ])
                this.avatar = this.$refs.avatar.files[ 0 ];
            },
            submit() {
                axios.post('/api/v1/usuarios', this.formData, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.token)}`
                    }
                }).then(({data})=> this.$router.push({path: `/usuarios/${data.id}`}))
                  .catch(error => this.errors = error.response.data.errors );
            }
        }
    }
</script>

<style scoped>

</style>