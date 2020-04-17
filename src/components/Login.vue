<template>
    <div class="columns is-centered">
        <div class="column ">
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Вход</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Email"
                                 :type="{ 'is-danger': hasError }">
                            <b-input
                                    type="email"
                                    v-model.trim="email"
                                    placeholder="Your email"
                                    required>
                            </b-input>
                        </b-field>

                        <b-field label="Пароль"
                                 :type="{ 'is-danger': hasError }"
                                 :message="{ 'Неверный пароль или email': hasError }">
                            <b-input
                                    type="password"
                                    v-model.trim="password"
                                    password-reveal
                                    placeholder="Your password"
                                    required>
                            </b-input>
                        </b-field>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="goHome()">Отмена</button>
                        <button class="button is-primary" @click="authUser()">Вход</button>
                    </footer>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            ...mapState({
                posts: state => state.posts,
                hasError: state => state.hasError
            }),
        },
        methods: {
            authUser() {
                this.$store.dispatch('authUser', {
                    email: this.email,
                    password: this.password
                })
            },
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>