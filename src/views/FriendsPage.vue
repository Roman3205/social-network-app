<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                friends: [],
                users: []
            }
        },

        mounted() {
            this.loadUsers()
            this.loadFriends()
        },
        
        methods: {
            async loadUsers() {
                let response = await axios.get('/users');
                this.users = response.data;
            },

            async loadFriends() {
                let response = await axios.get('/friends')
                this.friends = response.data
            },

            goUser(user) {
                this.$router.push({
                    name: 'user',
                    params: {
                        id: user._id
                    }
                })
            },

            async addFriend(e, user) {
                e.preventDefault();
                axios
                    .post('/add-friend', {
                        friendId: user._id
                    })
                    .then(() => {
                        this.loadUsers();
                        this.loadFriends()
                        this.$router.push({
                            name: 'friends'
                        });
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 400) {
                            alert('Пользователь уже в ваших друзьях');
                        } else {
                            alert('Ошибка при отправке запроса на сервер');
                        }
                    });
            }

        }
    }
</script>

<template>
    <div class="users-page">
        <h3>Друзья</h3>
        <ul class="list-group my-3">
            <li @click="goUser(item)" v-for="(item, index) in friends" class="list-group-item user">
                <img :src="'src/avatars/' + item.avatar">
                <div class="username">
                    {{ item.firstName }} {{ item.lastName }}
                </div>  
            </li>
        </ul>
        <h3>Все пользователи</h3>
        <ul class="list-group my-3">
            <li v-for="(item, index) in users" class="list-group-item userall">
                <div class="users-card-info">
                    <img :src="'src/avatars/' + item.avatar">
                    <div class="username">
                        {{ item.firstName }} {{ item.lastName }}
                    </div> 
                </div> 
                <div class="add">
                    <button class="btn btn-warning add-friend" @click="addFriend($event, item)">Добавить в друзья</button>
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

    .userall {
        display: flex;
        justify-content: space-between;
    }

    .add-friend {
        transition: 0.6s;
    }

    .add-friend:hover {
        opacity: 0.7;
    }
</style>