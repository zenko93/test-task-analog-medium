import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {router} from "@/router";


Vue.use(Vuex);

export default new Vuex.Store ({
    state: {
        posts: [],
        post: null,
        user: null,
        hasError: false,
        sortByNew: false
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = payload
        },
        SET_POST(state, payload) {
            state.post = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_ERROR(state, payload) {
            state.hasError = payload
        },
        DELETE_POST(state, index) {
            state.posts.splice(index, 1)
        },
        ADD_NEW_POST(state, newPost) {
            state.posts.push(newPost)
        },
        ADD_CLAPS(state, index) {
            state.posts[index].claps += 1;
        },
        SORT_BY_NEW(state, payload) {
            state.sortByNew = payload;
        },
    },
    actions: {
        getPosts({commit}) {
            axios
                .get('http://localhost:3000/posts')
                .then(response => {
                    if(response.status === 200) {
                        commit('SET_POSTS', response.data);
                    } else{
                        throw new Error('Ошибка рендеринг постов');
                    }
                })
                .catch(error => console.error(error))
        },
        authUser({commit}, {email, password}) {
            axios
                .get(`http://localhost:3000/users?login=${email}`)
                .then(response => {
                    const user = response.data[0];
                    if(user && user.password.toString() === password.toString()) {
                        commit('SET_USER', user);
                        router.push('/')
                    } else {
                        commit('SET_ERROR', true);
                    }
                })
        },
        changePost({state}, {title, description, updateAt}) {
            let id = state.post.id;
            axios
                .patch(`http://localhost:3000/posts/${id}`,{title, description, updateAt})
                .then(response => {
                    if(response.status === 200) {
                        router.push('/')
                    } else{
                        throw new Error('Ошибка изменения поста');
                    }
                })
                .catch(error => console.error(error))
        },

        deletePost({state, commit}, id) {
            axios
                .delete(`http://localhost:3000/posts/${id}`)
                .then(response => {
                    if(response.status === 200) {
                        const index = state.posts.findIndex(post => post.id === id);
                        commit('DELETE_POST', index);
                    } else{
                        throw new Error('Ошибка удаления поста');
                    }
                })
                .catch(error => console.error(error))
        },
        countClaps({commit, state}, {id , claps}, ) {
            axios
                .patch(`http://localhost:3000/posts/${id}`,{claps})
                .then(response => {
                    if(response.status === 200) {
                        const index = state.posts.findIndex(post => post.id === id);
                        commit('ADD_CLAPS', index)
                    } else{
                        throw new Error('Ошибка хлопков');
                    }
                })
                .catch(error => console.error(error))
        },
        addNewPost({commit}, post) {
            axios
                .post(`http://localhost:3000/posts`, post)
                .then(response => {
                    if(response.status === 201) {
                        commit('ADD_NEW_POST', post);
                        router.push('/');
                    } else{
                        throw new Error('Ошибка добавления новго поста');
                    }
                })
                .catch(error => console.error(error))
        },
    },
    getters: {
        userRole: state => {
            if (state.user !== null && typeof state.user.role !== "undefined") {
                return state.user.role
            }
            return "guest";
        },
        reversedPosts: state => {
            return [...state.posts].reverse();
        }
    }
})
