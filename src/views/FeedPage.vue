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

            getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
            }
        }
    }
</script>

<template>
    <div class="feed-page">
        <h3>Новости</h3>
        <article v-for="(item, index) in feed" class="card mt-3">
            <div class="card-body">
                <header>
                    <div class="info-card">
                        <img :src="'/src/avatars/' + item.author.avatar">
                        <div class="username">
                            {{ item.author.firstName }} {{ item.author.lastName }}
                        </div>
                    </div>
                    <div class="user-post-time">
                        {{ getRelativeDate(item.createdAt) }}
                    </div>
                </header>
                <div class="card-text">
                    {{ item.content }}
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

    .feed-page .feed {
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