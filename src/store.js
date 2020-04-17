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
        hasError: false
    },
    mutations: {
        GET_POSTS(state, payload) {
            state.posts = payload
        },
        GET_POST(state, payload) {
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
            // Vue.set(state.posts, newPost.id, newPost)
            state.posts.push(newPost)
        }
    },
    actions: {
        getPosts({commit}) {
            axios
                .get('http://localhost:3000/posts')
                .then(response => {
                    commit('GET_POSTS', response.data);
                })
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
        },

        deletePost({state}, id) {
            axios
                .delete(`http://localhost:3000/posts/${id}`)
                .then(response => {
                    if(response.status === 200) {
                        state.posts.find((post, index) => post.id === id ? state.posts.splice(index, 1)  : null)
                        // state.posts.find(function(post, index) {
                        //     console.log(post)
                        //     console.log(state.posts)
                        //     if(post.id === id) {
                        //         commit('DELETE_POST', index)
                        //     }
                        // })
                    }
                })
        },
        countClaps(context, {id , claps}, ) {
            axios
                .patch(`http://localhost:3000/posts/${id}`,{claps})
        },
    },
    getters: {
        userRole: state => {
            if (state.user !== null && typeof state.user.role !== "undefined") {
                return state.user.role
            }
            return "guest";
        }
    }
})
