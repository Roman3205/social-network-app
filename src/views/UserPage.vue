<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isReady: false,
            user: null,
            posts: [],
            postContent: '',
            createPostHide: false,
            info: '',
            image: ''
        }
    },

    mounted() {
        this.loadData();
    },

    watch: {
        $route() {
            this.loadData()
        }
    },

    methods: {
        async loadData() {
            this.isReady = false
            await this.loadUser()
            await this.loadPosts()
            this.isReady = true
        },

        async loadUser() {
            let response;
            if (this.$route.name == 'profile') {
                response = await axios.get(`/profile`);
                this.createPostHide = false
            } else {
                response = await axios.get(`/user`, {
                    params: {
                        id: this.$route.params.id
                    }
                })
                this.createPostHide = true
            }
            this.user = response.data;
        },

        async loadPosts() {
            let response = await axios.get(`/user/posts`, {
                params: {
                    id: this.user._id
                }
            });
            this.posts = response.data;
        },

        async createPost(event) {
            event.preventDefault()
            if(this.postContent !== '') {
                await axios.post(`/post/create`, {
                content: this.postContent 
            })
            this.postContent = ''
            }
            this.loadPosts()
        },

        getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
        },
        
        async CreateInfo(e) {
            e.preventDefault()
            if (this.info === '') {
                this.info = 'Без описания';
            }
            await axios.post('/info/create', {
            info: this.info,
            })
            this.info = ''
            this.loadUser()
        },

        async ChangeImage(e) {
            e.preventDefault()
            if (this.image === '') {
                this.image = 'https://yt3.ggpht.com/ytc/AKedOLQ80s7MHIiTfLyI6HMSWNih7aK_fm7NHPwzpMOoVw=s900-c-k-c0x00ffffff-no-rj';
            }
            await axios.post('/image/create', {
                image: this.image
            })
            this.image = ''
            this.loadUser()
        },

        async removeFriend(e) {
            e.preventDefault()
            axios
                .post('/friend/remove', {
                    friendId: this.user._id
                })
                .then(() => {
                    this.loadUser()
                    this.$router.push({
                    name: 'friends'
                })
                alert('Пользователь удален из друзей')
                })
        },

        async createChat(e) {
            e.preventDefault()
            axios
                .post('/chat/create', {
                    friendId: this.user._id
                })
                .then(() => {
                    this.loadUser()
                    this.$router.push({
                    name: 'messages'
                })
                alert('Чат создан')
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        alert('Чат уже создан');
                    } else {
                        alert('Ошибка при отправке запроса на сервер');
                    }
                });
        }
    }
}
</script>

<template>
    <div class="user-page">
        <div v-if="!isReady">
            Пожалуйста подождите, данные загружаются...
        </div>
        <div class="user-container" v-if="isReady">
            <div class="user-info">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4 my-2">
                            <img :src="user.avatar" class="img-fluid rounded-start">
                            <div v-if="!createPostHide" class="img-selector d-flex g-0">
                                <input type="text" v-model="image" class="input-info img-inp mt-1" placeholder="Вставьте ссылку на изображение"/>
                                <form @submit="ChangeImage">
                                    <button type="submit" class="btn btn-warning ok">OK</button>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">
                                    {{ user.firstName }} {{ user.lastName }}
                                </h3>
                                <form v-if="!createPostHide" @submit="CreateInfo" class="info-form mt-4">
                                    <input type="text" v-model="info" class="input-info" placeholder="Расскажи о себе">
                                    <button type="submit" class="btn btn-warning">Сохранить</button>
                                </form>
                                <p v-if="!createPostHide" class="mt-2">Твое описание:</p>
                                <p class="card-text info-card" :class="{
                                    'mt-5': createPostHide
                                }">
                                    {{ user.info }}
                                </p>
                                <div v-if="!createPostHide" class="secret-info">
                                    <p class="card-text">
                                    Твоя почта: <b>{{ user.mail }}</b>
                                    </p>
                                    <p class="card-text">
                                    Твой пароль: <b>{{ user.password }}</b>
                                    </p>
                                </div>
                                <div class="add" v-if="createPostHide">
                                    <button class="btn add-friend" @click="removeFriend">Удалить из друзей</button>
                                    <button class="btn btn-warning" @click="createChat">Создать переписку</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-wall">
                <form class="post-form my-3" @submit="createPost" v-if="!createPostHide">
                    <textarea v-model="postContent" class="form-control" rows="2" placeholder="Что у вас нового?"></textarea>
                    <button type="submit" class="btn btn-warning">
                        Отправить
                    </button>
                </form>
                <div class="user-post card mb-3" v-for="(item, index) in posts">
                    <div class="card-body">
                        <div class="user-post-time">
                            {{ getRelativeDate(item.createdAt) }}
                        </div>
                        <p class="card-text">
                            {{ item.content }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .user-page img {
        width: 300px;
        object-fit: cover;
        object-position: center;
    }

    .info-form {
        display: flex;
        gap: 5px;
    }

    .img-inp {
        margin: 0 auto;
        font-size: 15px!important;
        font-weight: bold!important;
    }

    .info-card {
        border: 3px solid lightgrey;
        max-width: 595px;
        height: 60px;
        font-weight: bold;
        border-radius: 5px;
        overflow-y: scroll;
        cursor: pointer;
        font-size: 18px;
    }

    .ok {
        transform: scale(0.9);
        margin-top: 4px;
    }

    .input-info {
        border: 3px solid lightgrey;
        display: block;
        width: 80%;
        height: 38px;
        background: none;
        color: #666;
        font-family: monospace;
        font-size: 17px;
        font-weight: lighter;
        border-radius: 5px;
    }

    .post-form {
        display: flex;
        gap: 10px;
    }

    .user-post-time {
        font-size: 14px;
        color: #6c757d;
    }

    .btn-warning {
        transition: 0.7s;
    }

    .btn-warning:hover {
        opacity: 0.7;
    }
    
    .add {
        display: flex;
        justify-content: space-between;
    }

    .add-friend {
        background-color: rgb(220, 18, 18);
        color: #fff!important;
        transition: 0.6s;
    }

    .add-friend:hover {
        background-color: rgb(220, 18, 18);
        color: #fff!important;
        opacity: 0.7;
    }
</style>