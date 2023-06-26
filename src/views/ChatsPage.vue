<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                chats: []
            }
        },

        mounted() {
            this.loadChats()
        },

        methods: {
            async loadChats() {
                let response = await axios.get('/chat/all')
                this.chats = response.data
            },

            goChat(item) {
                this.$router.push({
                    name: 'chat',
                    params: {
                        id: item._id
                    }
                })
            }
        }
    }
</script>

<template>
    <div class="users-page">
        <h3>Чаты</h3>
        <ul class="list-group my-3">
            <li @click="goChat(item)" v-for="(item, index) in chats" class="list-group-item user">
                <img :src="item.people[0].avatar">
                <div class="username">
                    {{ item.people[0].firstName }} {{ item.people[0].lastName }}
                </div>
            </li>
        </ul>
    </div>
</template>

<style>
.users-page img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        object-position: center;
        border-radius: 100%;
        border: 1px solid #6c757d;
    }

    .users-page .user,
    .users-card-info,
    .add {
        cursor: pointer;
        height: 100px;
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .users-page .username {
        font-weight: bold;
    }

    .users-card-info {
        display: flex;
    }
</style>