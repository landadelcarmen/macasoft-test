<template>
    <div class="card">
        <h2 class="p-4 flex justify-between items-center">
            <span v-if="!edit">{{name}}</span>
            <input v-else type="text" class="form-input text-base w-3/4 mb-0" v-model="name">
            <div>
                <button @click.prevent="edit = !edit" class="btn" :class="edit ? 'bg-transparent text-grey-dark' : ''">
                    {{isBeingEdited}}
                </button>
                <button v-if="!edit" @click.prevent="deleteUser" class="text-red-dark text-xs">
                    Eliminar
                </button>
            </div>

        </h2>
        <div class="p-4">
            <div class="flex">
                <div class="w-1/2">
                    <img class="rounded-full w-48 border-2 border-blue-dark h-48" :src="`/avatars/${user.avatar}`" :alt="user.name">
                </div>
                <div class="w-1/2 flex items-center justify-center flex-col">
                    <div v-if="!edit" class="uppercase" v-text="$root.role(role)"></div>
                    <select v-else class="form-input" v-model="role">
                        <option value="1">Administrador</option>
                        <option value="2">Vendedor</option>
                        <option value="3">Usuario</option>
                    </select>

                    <div v-if="!edit" class="font-bold mt-8" v-text="email"></div>
                    <input v-else type="text" class="form-input" v-model="email">

                    <button v-if="edit" class="btn ml-auto" @click.prevent="submit">Guardar Cambios</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {

        data() {
            return {
                user: {},
                name: null,
                email: null,
                role: null,
                password: null,
                edit: false,
                permanently: false
            }
        },

        mounted() {
            axios.get(`/api/v1/usuarios/${this.$route.params.user_id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.token)}`
                }
            }).then( ({data}) => {
                this.user = data;
                this.name = data.name;
                this.email = data.email;
                this.role = data.role;
            });
        },

        computed: {
            isBeingEdited() {
                if(this.edit) {
                    return 'Cancelar';
                }

                return 'Editar';
            },

            submitableData() {
                let data = {};

                if(this.user.email !== this.email) {
                    data.email = this.email;
                }
                if(this.user.role !== this.role) {
                    data.role = this.role;
                }
                if(this.user.name !== this.name) {
                    data.name = this.name;
                }

                return data;
            }
        },

        methods: {

            deleteUser() {
                let user = JSON.parse(localStorage.user);

                if(user.id === this.user.id) {
                    this.permanently = false;
                }

                axios.delete(`/api/v1/usuarios/${this.user.id}`, {
                    data: {
                        delete_permanently: this.permanently
                    },
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.token)}`
                    }
                }).then( ({data}) => this.$router.push({ path: '/usuarios' }));
            },

            submit() {
                axios.put(`/api/v1/usuarios/${this.user.id}`, this.submitableData, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.token)}`
                    }
                }).then( ({data}) => {
                    this.user = data;
                    this.name = data.name;
                    this.email = data.email;
                    this.role = data.role;
                    this.edit = false;
                });
            }

        }
    }
</script>

<style scoped>

</style>