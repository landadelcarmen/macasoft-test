<template>
    <div class="card">
        <h2 class="p-4 flex justify-between items-center">
            Usuarios
            <button v-if="$root.isAdmin" @click.prevent="$router.push({path: '/usuarios/nuevo'})" class="btn">Nuevo Usuario</button>
        </h2>
        <div>
            <table class="w-full">
                <tbody>
                <tr v-for="user in listUsers" :key="user.id" :class="user.deleted_at ? 'bg-grey-light' : ''">
                    <td class="flex justify-center items-center px-2">
                        <div class="rounded-full h-12 w-12 my-2 overflow-hidden border-2 border-blue-dark" :style="isSoftDeleted(user)">
                            <img :src="`/storage/avatars/${user.avatar}`" class="h-full w-auto" alt="">
                        </div>

                    </td>
                    <td class="w-1/2 px-2">
                        <a href="#" @click.prevent="$router.push(`/usuarios/${user.id}`)" class="text-blue-dark no-underline">
                            <span class="font-bold underline text-sm">{{  user.name  }} {{user.deleted_at ? '(eliminado)' : ''}}</span><br>
                            <span class="uppercase text-xs text-grey-darker">{{ $root.role(user.role) }}</span>
                        </a>
                    </td>
                    <td class="px-2 text-sm">{{ user.email }}</td>
                </tr>
                </tbody>
            </table>
            <div class="p-4" v-if="users.length > 1">
                <button
                    class="cursor-pointer focus:outline-none py-2 px-4 hover:bg-blue-dark hover:text-white border-t-2 border-blue-dark"

                    :class="index === page ? 'bg-blue-dark text-white': ''"
                    v-for="(user,index) in users"
                    :key="'user'+index"
                    @click.prevent="page = index"
                    v-text="index + 1"
                ></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                users: [],
                page: 0
            }
        },

        mounted() {
            axios.get('/api/v1/usuarios', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.token)}`
                }
            }).then( ({data}) => this.users = data );
        },

        computed: {
            listUsers() {
                return this.users[this.page];
            },
        },

        methods: {
            isSoftDeleted(user) {
                return user.deleted_at ? 'filter: grayscale(100%); border-color: black': '';
            }
        }

    }
</script>

<style scoped>

</style>