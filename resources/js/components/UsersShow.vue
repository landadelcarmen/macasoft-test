<template>
    <div class="card">
        <h2 class="p-4 flex justify-between items-center">
            <span v-if="!edit">{{name}}</span>

            <input v-else type="text" class="form-input text-base w-3/4 mb-0" v-model="name">

            <div>
                <button v-if="!user.deleted_at" @click.prevent="edit = !edit" class="btn" :class="edit ? 'bg-transparent text-grey-dark hover:shadow-none' : ''">
                    {{ edit ? 'Cancelar' : 'Editar' }}
                </button>
                <button v-if="user.deleted_at && $root.isAdmin" @click.prevent="restoreUser" class="text-green-dark text-xs">
                    Restaurar
                </button>
                <button v-if="isDeletable" @click.prevent="$modal.show('user-confirm-delete')" class="text-red-dark text-xs">
                    Eliminar
                </button>
            </div>
        </h2>

        <div class="p-4">
            <div class="flex">
                <div class="w-1/2">
                    <div
                        v-if="user.avatar"
                        :style="`background-image: url(${avatarRoute})`"
                        class="rounded-full w-48 border-2 border-blue-dark h-48 bg-center bg-contain overflow-hidden"
                    >

                        <div
                            v-if="edit"
                            class="h-full w-full flex items-center underline font-bold justify-center uppercase text-xs text-white"
                            style="background-color: #2779bd47"
                        >
                            <label for="avatar" class="cursor-pointer">Cambiar Foto de Perfil</label>
                            <input type="file" accept="image/*" ref="avatar" id="avatar" class="hidden" @change="previewAvatar">
                        </div>

                    </div>
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

                    <div v-if="edit" class="w-full -mt-2">
                        <a
                            class="font-bold mb-4 text-xs inline-block self-start text-blue-dark"
                            href="#"
                            @click.prevent="editPassword = !editPassword"
                        >
                            {{ editPassword ? 'Cancelar Edición de' : 'Editar' }} Contraseña
                        </a>
                        <div v-if="editPassword" >
                            <input
                                placeholder="Contraseña"
                                type="password"
                                class="form-input"
                                v-model="password"
                            >

                            <input
                                placeholder="Confirmar Contraseña"
                                type="password"
                                class="form-input"
                                v-model="password_confirmation"
                            >
                        </div>
                    </div>

                    <button v-if="edit" class="btn ml-auto" @click.prevent="submit">Guardar Cambios</button>
                </div>
            </div>
        </div>

        <user-delete-confirm-modal
            :user="user"
        ></user-delete-confirm-modal>

    </div>
</template>

<script>

    import UserDeleteConfirmModal from './UserDeleteConfirmModal';

    export default {

        components: { UserDeleteConfirmModal },

        data() {
            return {
                user: {},
                name: null,
                email: null,
                role: null,
                edit: false,
                avatar: null,
                permanently: false,
                editPassword: false,
                password: null,
                password_confirmation: null,
            }
        },
        watch: {
            edit() {
                if(!this.edit) {
                    this.editPassword = false;
                    this.avatar = null;
                }
            },

            editPassword() {
                this.password = null;
                this.password_confirmation = null;
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

            avatarRoute() {
                return this.avatar ? this.avatar.url : `/storage/avatars/${this.user.avatar}`;
            },

            isDeletable() {
                if(this.user.deleted_at && !this.$root.isAdmin){
                    return false;
                }
                return true;
            },

            formData() {
                let formData = new FormData();

                formData.append('_method', 'PUT');

                if(this.user.email != this.email) {
                    formData.append('email',this.email);
                }

                if(this.password) {
                    formData.append('password',this.password);
                }

                if(this.password_confirmation) {
                    formData.append('password_confirmation',this.password_confirmation);
                }

                if(this.user.role != this.role) {
                    formData.append('role',this.role);
                }
                if(this.user.name != this.name) {
                    formData.append('name',this.name);
                }

                if(this.avatar) {
                    formData.append('avatar', this.avatar);
                }

                return formData;
            }
        },

        methods: {

            restoreUser() {
                axios.patch(`/api/v1/usuarios/${this.user.id}/restaurar`, null, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.token)}`
                    }
                }).then(({data}) => this.user = data);
            },

            previewAvatar() {
                this.$refs.avatar.files[ 0 ].url = URL.createObjectURL(this.$refs.avatar.files[ 0 ])
                this.avatar = this.$refs.avatar.files[ 0 ];
            },

            submit() {

                axios.post(`/api/v1/usuarios/${this.user.id}`, this.formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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