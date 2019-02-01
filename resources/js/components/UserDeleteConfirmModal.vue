<template>
    <modal
        name="user-confirm-delete"
        height="250px"
        width="350px"
    >
        <div class="flex flex-col p-4 h-full items-center">
            <p>¿estás seguro de eliminar la cuenta?</p>

            <div class="flex flex-col justify-around flex-1">
                <button
                    @click.prevent="deleteUser()"
                    class="btn"
                    v-if="!user.deleted_at"
                >
                    Eliminar Temporalmente
                </button>

                <button
                    class="btn bg-white text-red-dark hover:shadow-none font-bold"
                    v-if="canDeletePermanently"
                    @click.prevent="deleteUser(true)"
                >
                    Eliminar Permanentemente
                </button>

                <button
                    class="btn bg-white text-grey-darker hover:shadow-none font-bold"
                    @click.prevent="$modal.hide('user-confirm-delete')"
                >
                    Cancelar
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        props: [ 'user' ],

        computed: {
            canDeletePermanently() {
                return this.$root.isAdmin && this.user.id != JSON.parse(localStorage.user).id;
            }
        },

        methods: {

            deleteUser(permanently = false) {
                axios.delete(`/api/v1/usuarios/${this.user.id}`, {
                    data: {
                        delete_permanently: permanently
                    },
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.token)}`
                    }
                }).then( () => {
                    if(this.user.id == JSON.parse(localStorage.user).id) {
                        this.$root.logout();
                    }
                    this.$router.push({ path: '/usuarios' })

                });
            }

        }


    }
</script>

<style scoped>

</style>