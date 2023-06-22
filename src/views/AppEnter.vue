<script>
import axios from 'axios'

export default {
    data() {
        return {
            type: 'password',
            image: './src/assets/hide.png',
            mail: '',
            password: ''
        }
    },

    methods: {
        toggle(e) {
            e.preventDefault()
            if(this.type == 'password') {
                this.type = 'text'
                this.image = './src/assets/show.png'
            } else {
                this.type = 'password',
                this.image = './src/assets/hide.png'
            }
        },
        goRegister() {
            this.$router.push({
                name: 'register'
            })
        },
        async ProfileUser(e) {
            e.preventDefault();
            if (this.password === '' || this.mail === '') {
                alert('Заполните все поля');
            } else {
                axios
                    .post('/enter', {
                        password: this.password,
                        mail: this.mail
                    })
                    .then(() => {
                        this.$router.push({ name: 'profile' });
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 404) {
                            alert('Неправильно введенные данные');
                        } else {
                            alert('Ошибка при отправке запроса на сервер');
                        }
                    });
            }
        }
    }
}
</script>

<template>
    <div class="wrapper">
			<div class="inner">
				<div class="form">
                    <form @submit="ProfileUser" >
					<h3>Вход</h3>
					<div class="form-holder">
						<input v-model="mail" type="email" class="form-control" placeholder="Почта">
					</div>
					<div class="form-holder">
						<input v-model="password" :type="type" class="form-control form__input" placeholder="Пароль">
                        <button class="toggle btn btn-outline-secondary" @click="toggle">
                            <img :src="image"/>
                        </button>
					</div>
					<button type="submit" class="btn enter btn-warning">
						<span>Войти</span>
					</button>
				</form>
                <div class="go-register col">
                    <span>Нет аккаунта?</span>
                    <button class="reg-button" @click="goRegister()" >Зарегистрируйтесь сейчас</button>
                </div>
                </div>
			</div>
		</div>
</template>

<style scoped>
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .toggle img {
        height: 24px;
        text-align: center;
        margin-left: -4px;
        margin-top: -2.3px;
    }

    input, textarea, select, button {
        font-family: monospace;
    }
    
    .toggle {
        width: 40px;
        margin-top: 1px;
        height: 36.5px;
    }

    .wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(255,193,7);
    }

    .inner {
        position: relative;
        width: 435px;
    }
    
    .form {
        width: 100%;
        position: relative;
        z-index: 9;
        padding: 77px 61px 66px;
        background-color: #e3e3e3;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        -ms-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        -o-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        border-radius: 15px;
    }

    h3 {
        text-transform: uppercase;
        font-size: 25px;
        font-family: monospace;
        color: #333;
        letter-spacing: 3px;
        text-align: center;
        margin-bottom: 33px;
    }

    .form-holder {
        position: relative;
        margin-bottom: 21px;
        display: flex;
        gap: 5px;
    }

    .form-control {
        border: 3px solid lightgrey;
        display: block;
        width: 100%;
        height: 38px;
        background: none;
        color: #666;
        font-family: monospace;
        font-size: 17px;
        font-weight: lighter;
    }

    .form-control:focus {
        border-bottom: 1px solid #accffe;
    }

    .enter {
        border: none;
        width: 100%;
        height: 49px;
        margin-top: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        color: #fff;
        text-transform: uppercase;
        font-family: monospace;
        font-size: 17px;
        letter-spacing: 2px;
        transition: all 0.5s;
        position: relative;
        overflow: hidden;
    }

    .enter span {
        position: relative;
        z-index: 2;
    }

    .enter:before, .enter:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(153, 120, 30, 0.25);
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100%, 0);
        -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
        transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
    }

    .enter:after {
        -webkit-transition-delay: 0.2s;
        transition-delay: 0.2s;
    }

    .enter:hover:before, .enter:hover:after {
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
    }

    .go-register {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        gap: 5px;
        margin-top: 20px;
        font-style: italic;
    }

    .reg-button {
        border: none;
        color: rgb(219, 165, 1);
        background: inherit;
        transition: 0.7s;
    }

    .reg-button:hover {
        opacity: 0.6;
    }
</style>