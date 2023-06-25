<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                information: []
            }
        },

        mounted() {
            this.loadPage()
        },

        methods: {
            async loadPage() {
                await this.loadInfo()
            },

            async loadInfo() {
                let response = await axios.get('/chat', {
                    params: {
                        id: this.$route.params.id
                    }
                })
                this.information = response.data
                console.log(this.information.people[0].firstName)
                console.log(this.information.people[0].lastName)
            }
        }
    }
</script>

<template>
    <div class="container">
        <div class="info-user">
            <div class="user-chat">
                {{ information.people[0].firstName }}
                {{ information.people[0].lastName }}
            </div>
        </div>
        <div class="messages-container">
                <div class="message-l">
                    <div>Сообщение</div>
                </div>
                <div class="message-r">
                    <div>Сообщение</div>
                </div>
                <div class="message-l">
                    <div>Сообщение</div>
                </div>
                <div class="message-l">
                    <div>Сообщение</div>
                </div>
                <div class="message-r">
                    <div>Сообщение</div>
                </div>
                <div class="message-l">
                    <div>Сообщение</div>
                </div>
                <div class="message-r">
                    <div>Сообщение</div>
                </div>
                <div class="message-r">
                    <div>Сообщение</div>
                </div>
        </div>
        <div class="send-message-form">
        <form action="">
            <input type="text">
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
        font-size: 20px;
        padding: 20px;
        gap: 10px;
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
        padding: 5px 17px;
    }

    .message-r {
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        padding: 5px 17px;
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