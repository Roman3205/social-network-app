let express = require(`express`)
let app = express()
let port = process.env.PORT || 3005

app.listen(port, function () {
    console.log(`http://localhost:` + port)
})

let cors = require('cors')
app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json())

let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/social-network')

let userSchema = new mongoose.Schema({
    avatar: String,
    firstName: String,
    lastName: String,
    info: String,
    password: String,
    mail: String,
    friends: [{
        type: mongoose.ObjectId,
        ref: 'user'
    }],
    chats: [{
        type: mongoose.ObjectId,
        ref: 'chat'
    }]
})

let postSchema = new mongoose.Schema({
    author: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    content: String,
    likes: Number
}, {
    timestamps: true
})

let chatSchema = new mongoose.Schema ({
    people: [{
        type: mongoose.ObjectId,
        ref: 'user'
    }],
    messages: [{
        type: mongoose.ObjectId,
        ref: 'message'
    }]
})

let messageSchema = new mongoose.Schema ({
    from: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    to: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    text: String
}, {
    timestamps: true
})

let User = mongoose.model('user', userSchema)
let Post = mongoose.model('post', postSchema)
let Chat = mongoose.model('chat', chatSchema)
let Message = mongoose.model('message', messageSchema)

let currentuser = null

app.post('/register', async function(req,res) {
    let name = req.body.name
    let surname = req.body.surname
    let mail = req.body.mail
    let password = req.body.password

    let user = new User({
        firstName: name,
        lastName: surname,
        avatar: 'https://ms-luxury-hair.ru/images/testimonies/and-png-png',
        info: 'Без описания',
        password: password,
        mail: mail,
        friends: [],
        chats: []
    })

    await user.save()

    res.send('Регистрация прошла успешно')
})

app.post('/enter', async function(req,res) {
    let mail = req.body.mail
    let password = req.body.password

    let user = await User.findOne({mail: mail, password: password})

    if(user) {
        currentuser = user._id
        res.send('Вход выполнен успешно')
    } else {
        res.status(404).send('Пользователь не найден');
    }
})

app.post('/info/create', async function(req,res) {
    let info = req.body.info

    let user = await User.findOne({_id: currentuser})
    user.info = info

    await user.save()

    res.send('Описание задано')
})

app.post('/image/create', async function(req,res) {
    let image = req.body.image

    let user = await User.findOne({_id: currentuser})
    user.avatar = image

    await user.save()

    res.send('Фото профиля задано')
})

app.get('/profile', async function (req, res) {
    if (currentuser == null) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }
    let user = await User.findOne({_id: currentuser})

    res.redirect(`/user?id=${user._id}`)
})

app.get('/user', async function (req, res) {
    if (currentuser == null) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }
    let id = req.query.id

    let user = await User.findOne({_id: id})

    res.send(user)
})

app.get('/user/posts', async function (req, res) {
    if (currentuser == null) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }
    
    let id = req.query.id

    let posts = await Post.find({'author': id}).sort({createdAt: -1})
    
    res.send(posts)
})

app.get('/users', async function (req, res) {
    if (currentuser == null) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }
    let users = await User.find({_id: {$ne: currentuser}})

    res.send(users)
})

app.get('/feed', async function (req, res) {
    if (currentuser == null) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }
    let posts = await Post.find({author: {$ne: currentuser}}).sort({createdAt: -1}).populate('author')
    
    res.send(posts)
})

app.post('/post/create', async function (req, res) {
    let content = req.body.content
    
    let post = new Post({
        author: currentuser,
        content: content,
        likes: 0
    })
    
    await post.save()

    res.send('Пост создан!')
})

app.post('/post/like', async function (req,res) {
    let id = req.body.id

    let post = await Post.findOne({ _id: id })

    if(!post) {
        res.status(404).send('Пост не найден')
        return;
    }

    post.likes += 1

    await post.save()

    res.send('Лайк поставлен на данный пост')
})

app.post('/logout', async function (req, res) {
    currentuser = null
    res.send('Выход из аккаунта выполнен')
})

app.post('/friend/add', async function(req,res) {
    let friendId = req.body.friendId

    let currentUser = await User.findOne({ _id: currentuser });
    let friendUser = await User.findOne({ _id: friendId });

    if (currentUser.friends.includes(friendId) || friendUser.friends.includes(currentuser)) {
        res.status(400).send('Пользователи уже являются друзьями');
        return;
    }

    currentUser.friends.push(friendId);

    await currentUser.save();

    friendUser.friends.push(currentuser);

    await friendUser.save();

    res.send('Пользователь успешно добавлен в друзья');
})

app.post('/friend/remove', async function (req, res) {
    let friendId = req.body.friendId;
    let currentUser = await User.findOne({ _id: currentuser });
    let friendUser = await User.findOne({ _id: friendId });
  
    if (!currentUser) {
      return res.status(404).send('Пользователь не найден');
    }
  
    if (!friendUser) {
      return res.status(404).send('Друг не найден');
    }
  
    currentUser.friends = currentUser.friends.filter(id => id.toString() !== friendId);
    await currentUser.save();
  
    friendUser.friends.splice(currentUser, 1)
    await friendUser.save();
  
    res.send('Пользователь удален из друзей');
});  

app.get('/friends', async function(req, res) {
    let user = await User.findOne({ _id: currentuser }).populate('friends', '-friends')

    if (!user) {
        res.status(404).send('Пользователь не найден');
        return;
    }

    let friends = user.friends

    res.send(friends)
})

app.post('/chat/create', async function (req,res) {
    let friendId = req.body.friendId

    let currentUser = await User.findOne({ _id: currentuser });
    let friendUser = await User.findOne({ _id: friendId });

    let check = await Chat.findOne({ people: { $all: [currentUser._id, friendId] } });

    if(check) {
        res.status(400).send('Чат уже создан');
        return;
    }

    let chat = new Chat({
        people: [currentUser, friendId],
        messages: []
    })

    await chat.save()

    currentUser.chats.push(chat._id);
    await currentUser.save();

    friendUser.chats.push(chat._id);
    await friendUser.save();

    res.send('Чат создан');
})

app.get('/chat/all', async function(req,res) {
    if (currentuser == null) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }

    let chats = await Chat.find({people: currentuser}).populate({
        path: 'people',
        select: 'firstName lastName avatar',
        match: {_id: {$ne: currentuser}}
    })

    res.send(chats)
})

app.get('/chat', async function(req,res) {
    if (currentuser == null) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }
    let id = req.query.id

    let chat = await Chat.findOne({_id: id}).populate({
        path: 'people',
        select: 'firstName lastName',
        match: {_id: {$ne: currentuser}}
    })

    let check = await User.findOne({ _id: currentuser, chats: chat._id }).populate('chats');

    if (!check) {
        res.status(403).send('Вы не вошли в аккаунт');
        return;
    }

    let messages = await Chat.find({_id: id}).populate('messages')

    res.send({chat, messages})
})

app.post('/message/send', async function(req,res) {
    let text = req.body.text
    let to = req.body.to
    let id = req.body.id

    let from = await User.findOne({ _id: currentuser })
    
    let message = new Message({
        from: from,
        to: to,
        text: text
    })

    await message.save()

    let chat = await Chat.findOne({_id: id}).populate('messages')

    chat.messages.push(message._id);
    await chat.save();

    res.send('Сообщение отправлено');
})