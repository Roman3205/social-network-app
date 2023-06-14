<script>
export default {
    data() {
        return {
            
        }
    },
    
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
            this.$route.push({
                name: 'feed'
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
        </ul>
    </div>
</template>

<style>
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
</style>