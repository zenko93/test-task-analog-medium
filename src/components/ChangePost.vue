<template>
    <div class="card-content">
        <b-field label="Title">
            <b-input type="text"
                     v-model="title"
            >
            </b-input>
        </b-field>

        <b-field label="Text">
            <b-input maxlength="500"
                     type="textarea"
                     v-model="description">
            </b-input>
        </b-field>
        <div class="buttons is-right">
            <button class="button"
                    @click="saveChanges()">
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
                title: this.$store.state.post.title,
                description: this.$store.state.post.description
            }
        },
        methods: {
            goHome() {
                this.$router.push('/')
            },
            saveChanges() {
                let updateDate = new Date;
                this.$store.dispatch('changePost', {
                    title: this.title,
                    description: this.description,
                    updateAt: updateDate.toISOString()
                });
                this.$store.dispatch('getPosts');
                this.$router.push('/')
            }
        },
        name: "ChangePost"
    }
</script>

<style scoped>

</style>