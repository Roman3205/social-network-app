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

            goUser(item) {
                this.$router.push({
                    name: 'user',
                    params: {
                        id: item._id
                    }
                })
            },

            async addFriend(e, user) {
                e.preventDefault();
                axios
                    .post('/friend/add', {
                        friendId: user._id
                    })
                    .then(() => {
                        this.loadUsers();
                        this.loadFriends()
                        this.$router.push({
                            name: 'friends'
                        });
                        alert('Пользователь добавлен в друзья')
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 400) {
                            alert('Данный пользователь уже у вас в друзьях');
                        } else {
                            alert('Ошибка при отправке запроса на сервер');
                        }
                    });
            },



            isFriend(user) {
                return this.friends.some(friend => friend._id === user._id)
            }
        }
    }
</script>

<template>
    <div class="users-page">
        <h3>Друзья</h3>
        <p class="mt-5 empty-list" v-if="this.friends.length == 0">Список друзей пуст</p>
        <ul class="list-group my-3">
            <li @click="goUser(item)" v-for="(item, index) in friends" class="list-group-item user">
                <img :src="item.avatar">
                <div class="username">
                    {{ item.firstName }} {{ item.lastName }}
                </div>  
            </li>
        </ul>
        <h3>Все пользователи</h3>
        <ul class="list-group my-3">
            <li v-for="(item, index) in users" class="list-group-item userall">
                <div class="users-card-info">
                    <img :src="item.avatar">
                    <div class="username">
                        {{ item.firstName }} {{ item.lastName }}
                    </div> 
                </div> 
                <div class="add">
                    <button v-if="!isFriend(item)" class="btn btn-warning add-friend" @click="addFriend($event, item)">Добавить в друзья</button>
                    <button v-if="isFriend(item)" class="btn btn-warning add-friend" disabled>У вас в друзьях</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
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

    .empty-list {
        font-size: 20px;
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