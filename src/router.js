import Vue from 'vue'
import Router from 'vue-router'
import ListOfPosts from "@/components/ListOfPosts";
import Login from "@/components/Login";
import ChangePost from "@/components/ChangePost";
import CreatePost from "@/components/CreatePost";

Vue.use(Router);

export const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: ListOfPosts
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/change-post/:id',
            props: true,
            name: 'ChangePost',
            component: ChangePost
        },
        {
            path: '/create-post',
            name: 'CreatePost',
            component: CreatePost
        }
    ]
    }
);