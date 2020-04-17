<template>
    <div class="columns is-mobile is-centered">
        <div class="column is-half">
            <div class="card mt" v-for="post in paginatedUsers" :key="post.id" :id="post.id">
                <div class="card-content">
                    <p class="title">
                        {{ post.title }}
                    </p>
                    <p class="subtitle">
                        {{ post.description }}
                    </p>
                    <div class="columns ">
                        <div class="column is-one-quarter">
                            {{  passTimeSinceUpdate(post) }}
                        </div>
                        <div class="column">
                            <div class="buttons is-right">
                                <button v-if="userRole === 'reader'"
                                        class="button"
                                        @click="countClaps(post)">
                                    <span class="icon">
                                      <i class="fas fa-sign-language"></i>
                                    </span>
                                    <span>{{ post.claps }}</span>
                                </button>
                                <div v-else-if="userRole === 'writer'">
                                    <button class="button" @click="changePost(post)">
                                    <span class="icon">
                                      <i class="far fa-edit"></i>
                                    </span>
                                        <span>Изменить</span>
                                    </button>
                                    <button class="button" @click="deletePost(post)">
                                    <span class="icon is-small">
                                      <i class="fas fa-trash-alt"></i>
                                    </span>
                                        <span>Удалить</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-pagination
                    v-if="total > 10"
                    class="mt"
                    :total="total"
                    :current.sync="current"
                    :range-before="rangeBefore"
                    :range-after="rangeAfter"
                    :order="order"
                    :size="size"
                    :simple="isSimple"
                    :per-page="perPage"
                    icon-pack="fa"
                    :icon-prev="prevIcon"
                    :icon-next="nextIcon"
                    aria-next-label="Next page"
                    aria-previous-label="Previous page"
                    aria-page-label="Page"
                    aria-current-label="Current page">
            </b-pagination>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'

    export default {
        name: "ListOfPosts",
        data() {
            return {
                current: 1,
                perPage: 10,
                rangeBefore: 1,
                rangeAfter: 1,
                order: 'is-centered',
                size: '',
                isSimple: false,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right'
            }
        },
        computed: {
            ...mapState({
                posts: state => state.posts,
                postById: state => state.postById,
                user: state => state.user
            }),
            ...mapGetters([
                'userRole',
            ]),
            total() {
                return this.posts.length
            },
            paginatedUsers() {
                let from = (this.current - 1) * this.perPage;
                let to = from + this.perPage;
                return this.posts.slice(from , to);
            }
        },
        methods: {
            passTimeSinceUpdate(post) {
                let oneDay = 1000*60*60*24;
                let currentDate = new Date;
                let creationDate = new Date(post.createdAt);
                let updateDate = new Date(post.updateAt);
                let lastDate = post.updateAt ? updateDate : creationDate;

                let daysSinceUpdate = (currentDate - lastDate) / oneDay;

                if (lastDate.getFullYear() < currentDate.getFullYear()) {
                    return ` ${(currentDate.getFullYear() - lastDate.getFullYear())} год назад`
                }
                else if (daysSinceUpdate > 60) {
                    return `${(currentDate.getMonth() - lastDate.getMonth())} месяца назад`
                }
                else if (daysSinceUpdate < 1 ) {
                    return `недавно`
                }
                else return `${daysSinceUpdate.toFixed(0)} дней назад`
            },

            changePost(post) {
                this.$store.commit('GET_POST', post);
                this.$router.push(`/change-post/${post.id}`);
            },

            deletePost(post) {
                this.$store.dispatch('deletePost', post.id)
            },

            countClaps(post) {
                this.$store.dispatch('countClaps', {
                    id: post.id,
                    claps: ++post.claps
                });
            }
        },
        mounted() {
            this.$store.dispatch('getPosts');
        }
    }
</script>

<style scoped>
    .mt {
        margin-top: 16px;
    }
</style>