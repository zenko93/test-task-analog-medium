<template>
    <b-navbar type="is-primary">
        <template slot="start">
            <b-navbar-item @click="goHome()">
                Главная страница
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div v-if="isMainPage" class="is-right mr">
                    <button class="button mr is-light"
                            @click="mSortByNew()">
                        <span class="icon">
                          <i :class="[sortByNew ? 'fas fa-chevron-down' : 'fas fa-chevron-up']"></i>
                        </span>
                        <span>Сначала {{sortByNew ? 'новые' : 'старые'}}</span>
                    </button>
                </div>
                <div v-if="userRole === 'writer'" class="is-right mr">
                    <button class="button mr is-light"
                            @click="createPost()">
                        <span class="icon">
                          <i class="far fa-plus-square"></i>
                        </span>
                        <span>Добавить пост</span>
                    </button>
                </div>
                <div v-if="user" class="is-right mr">
                    <button class="button mr is-light"
                            @click="logOut()">
                        <span class="icon">
                          <i class="fas fa-sign-out-alt"></i>
                        </span>
                        <span>Выход</span>
                    </button>
                </div>
                <div v-else class="buttons" @click="goLogin()">
                    <a class="button is-light">
                        Логин
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: "NavBar",
        computed: {
            ...mapState({
                user: state => state.user,
                sortByNew: state => state.sortByNew
            }),
            ...mapGetters([
                'userRole'
            ]),
            isMainPage() {
                return this.$route.path === '/'
            }
        },
        methods: {
            goHome() {
                if (this.$route.path !== '/') {
                    this.$router.push('/');
                }
            },
            goLogin() {
                if (this.$route.path !== '/login'){
                    this.$router.push('/login');
                }
            },
            logOut() {
                this.$store.commit('SET_USER', null);
                if(this.$route.path === '/create-post') {
                    this.$router.push('/');
                }
            },
            createPost() {
                if (this.$route.path !== '/create-post'){
                    this.$router.push('/create-post');
                }
            },
            mSortByNew() {
                this.$store.commit('SORT_BY_NEW', !this.sortByNew)
            }
        }
    }
</script>

<style scoped>
    .mr {
        margin-right: 8px;
    }
</style>