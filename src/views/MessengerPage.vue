<script>
    import axios from 'axios';
    import dayjs from 'dayjs';

    export default {
        data() {
            return {
                information: null,
                messages: [],
                text: '',
                to: '',
                param: null
            }
        },

        mounted() {
            this.loadInfo()
        },

        methods: {
            async loadInfo() {
                let response = await axios.get('/chat', {
                    params: {
                        id: this.$route.params.id
                    }
                })
                this.information = response.data.chat
                this.messages = response.data.messages
                this.to = this.information.people[0]._id
                this.param = this.messages[0].messages

                this.$nextTick(() => {
                    this.scrollToBottom()
                })
            },

            scrollToBottom() {
                let container = document.querySelector('.messages-container')
                container.scrollTop = container.scrollHeight
            },

            async sendMessage(e) {
                e.preventDefault()
                if(this.text !== '') {
                    await axios.post('/message/send', {
                        text: this.text,
                        to: this.to,
                        id: this.$route.params.id
                    })
                    this.text = ''
                }
                this.loadInfo()
            },

            getRelativeDate(date) {
                let day = dayjs(date)
                return day.fromNow()
            }
        }
    }
</script>

<template>
    <div class="container">
        <div class="info-user">
            <div class="user-chat" v-if="information">
                {{ information.people[0].firstName }} {{ information.people[0].lastName }}
            </div>
        </div>
        <div class="messages-container">
            <div v-for="(item) in param" :class="{'message-l': item.from === to, 'message-r': item.from !== to}" >
                <div class="text-message">
                    <div>{{ item.text }}</div>
                    <div class="date" :class="{'left': item.from === to, 'right': item.from !== to}" ><p><sub>{{ getRelativeDate(item.createdAt) }}</sub></p></div>
                </div>
            </div>
        </div>
        <div class="send-message-form">
        <form @submit="sendMessage">
            <input v-model="text" type="text">
            <button type="submit" class="btn btn-warning">Отправить</button>
        </form>
        </div>
    </div>
</template>

<style scoped>
    * {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .container {
        width: 950px;
        height: 600px;
        background-color: lightgray;
    }
    
    .messages-container {
        width: 100%;
        height: 81%;
    }

    .send-message-form {
        width: 100%;
        height: 10%;
    }
    
    form {
        display: flex;
        gap: 10px;
    }

    .info-user {
        width: 100%;
        height: 50px;
        font-size: 22px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-message {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0px;
    }

    .left {
        align-self: flex-start;
    }

    .right {
        align-self: flex-end;
    }

    .send-message-form input {
        width: 83%;
        height: 40px;
        border: none;
        border-radius: 10px;
        font-size: 24px;
        padding-left: 10px;
    }

    .send-message-form button {
        width: 15%;
        height: 40px;
    }

    .messages-container {
        height: 75%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        margin: 20px 0px 20px 0px;
        border: 2px solid grey;
        border-radius: 10px;
        font-size: 25px;
        padding: 20px;
        gap: 10px;
    }

    .messages-container p {
        font-size: 19.5px;
    }

    .messages-container::-webkit-scrollbar {
        width: 12px;
    }
    .messages-container::-webkit-scrollbar-track {
        background: rgb(147, 146, 146);
        border-radius: 20px;
    }

    .message-l {
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        padding: 5px 17px 0px 17px;
        max-width: 350px;
        word-wrap: break-word;
    }

    .message-r {
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        padding: 5px 17px 0px 17px;
        max-width: 350px;
        word-wrap: break-word;
    }

    .message-l,
    .message-r {
        background-color: #fff;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .btn-warning {
        transition: 0.6s;
    }

    .btn-warning:hover {
        opacity: 0.7;
    }
</style>