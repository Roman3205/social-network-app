<script>
    import axios from 'axios';
    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                feed: []
            }
        },

        mounted() {
            this.loadFeed()
        },
        
        methods: {
            async loadFeed() {
                let response = await axios.get('/feed')
                this.feed = response.data
            },

            async setLike(e, item) {
                e.preventDefault()
                await axios.post('/post/like', {
                    id: item._id
                })

                this.loadFeed()
            },

            getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
            }
        }
    }
</script>

<template>
    <div class="feed-page mb-4">
        <h3>Новости</h3>
        <p class="mt-4 empty-list" v-if="this.feed.length == 0">На данный момент новостей нет</p>
        <article v-for="(item, index) in feed" class="card mt-3">
            <div class="card-body">
                <header>
                    <div class="info-card">
                        <img :src="item.author.avatar">
                        <div class="username">
                            {{ item.author.firstName }} {{ item.author.lastName }}
                        </div>
                    </div>
                    <div class="user-post-time">
                        {{ getRelativeDate(item.createdAt) }}
                    </div>
                </header>
                <div class="flex-info d-flex mb-2">
                    <div class="card-text">
                        {{ item.content }}
                    </div>
                    <button type="button" @click="setLike($event, item)" class="btn btn-outline-danger">
                        Like
                        <span class="badge rounded-pill text-bg-danger">
                            {{ item.likes }}
                        </span>
                    </button>
                </div>
            </div>
        </article>
    </div>
</template>

<style scoped>
    .feed-page img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        object-position: center;
        border-radius: 100%;
        border: 1px solid #6c757d;
    }

    .feed-page .info-card {
        cursor: pointer;
        height: 100px;
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .feed-page .username {
        font-weight: bold;
        align-self: center;
    }
    
    header {
        display: flex;
        justify-content: space-between;
    }

    .flex-info {
        justify-content: space-between;
        align-items: center;
    }

    .empty-list {
        font-size: 20px;
    }

    .info-card {
        display: flex;
        gap: 15px;
    }

    .user-post-time {
        align-self: center;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>