<script>
import axios from 'axios'

export default {
    methods: {
        goProfile() {
            this.$router.push({
                name: 'profile'
            })
        },
        goFriends() {
            this.$router.push({
                name: 'friends'
            })
        },
        goFeed() {
            this.$router.push({
                name: 'feed'
            })
        },
        goChats() {
            this.$router.push({
                name: 'messages'
            })
        },
        async logOut() {
            await axios.post('/logout');
            this.$router.push({
                name: 'login'
            })
        }
    }
}

</script>

<template>
    <div class="app-sidebar">
        <ul>
            <li>
                <img src="../assets/logo.png" alt="">
            </li>
            <li>
                <button class="btn btn-outline-warning text-black" @click="goProfile()" :class="{
                    active: $route.name === 'profile'
                }" >
                    Моя страница
                </button>
            </li>
            <li>
                <button class="btn btn-outline-warning text-black" @click="goFriends()" :class="{
                    active: $route.name === 'friends'
                }" >
                    Друзья
                </button>
            </li>
            <li>
                <button class="btn btn-outline-warning text-black" @click="goFeed()" :class="{
                    active: $route.name === 'feed'
                }" >
                    Новости
                </button>
            </li>
            <li>
                <button class="btn btn-outline-warning text-black" @click="goChats()" :class="{
                    active: $route.name === 'messages'
                }" >
                    Сообщения
                </button>
            </li>
            <li>
                <button class="btn red-button text-black" @click="logOut()">
                    Выйти
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .app-sidebar ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;

    }

    .app-sidebar li {
        list-style-type: none;
        width: 100%;
    }

    .app-sidebar button {
        width: 100%;
    }

    .app-sidebar img {
        width: 100%;
    }

    .red-button {
        background-color: rgb(220, 18, 18);
        color: #fff!important;
        transition: 0.6s;
    }

    .red-button:hover {
        background-color: rgb(220, 18, 18);
        color: #fff!important;
        opacity: 0.7;
    }
</style>