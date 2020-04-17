<template>
    <div class="card-content">
        <b-field label="Title">
            <b-input type="text"
                     v-model="title"
            >
            </b-input>
        </b-field>

        <b-field label="Text">
            <b-input maxlength="200"
                     type="textarea"
                     v-model="description">
            </b-input>
        </b-field>
        <div class="buttons is-right">
            <button class="button"
                    @click="addNewPost()">
                <span> Сохранить </span>
            </button>
            <button class="button"
                    @click="goHome()">
                <span> Отмена </span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: ''
            }
        },
        methods: {
            goHome() {
                this.$router.push('/');
            },
            addNewPost() {
                let indexLastPost = this.$store.state.posts.length - 1;
                let id = this.$store.state.posts[indexLastPost].id + 1;
                let createdAt = new Date().toISOString();
                let newPost = {
                    id,
                    title: this.title,
                    description: this.description,
                    claps: 0,
                    createdAt,
                    updateAt: '',
                    userId: 1
                };
                this.$store.dispatch('addNewPost', newPost);
            }
        },
        name: "ChangePost"
    }
</script>

<style scoped>

</style>