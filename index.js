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
    username: {
        unique: true,
        type: String
    },
    avatar: String,
    firstName: String,
    lastName: String,
    info: String,
    phone: String,
    friends: [{
        type: mongoose.ObjectId,
        ref: 'user'
    }]
})

let postSchema = new mongoose.Schema({
    author: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    content: String
}, {
    timestamps: true
})

let User = mongoose.model('user', userSchema)
let Post = mongoose.model('post', postSchema)

let currentuser = '6480a6b45299bc01bb788b14'

app.get('/profile', async function (req, res) {
    let user = await User.findOne({_id: currentuser})

    res.redirect(`/user?username=${user.username}`)
})

app.get('/user', async function (req, res) {
    let username = req.query.username

    let user = await User.findOne({username: username})

    res.send(user)
})

app.get('/user/posts', async function (req, res) {
    let id = req.query.id

    let posts = await Post.find({'author': id}).sort({createdAt: -1})
    
    res.send(posts)
})

app.get('/users', async function (req, res) {
    let users = await User.find({_id: {$ne: currentuser}})

    res.send(users)
})

app.get('/feed', async function (req, res) {
    let posts = await Post.find({author: {$ne: currentuser}}).sort({createdAt: -1}).limit(5).populate('author')
    
    res.send(posts)
})

app.post('/post/create', async function (req, res) {
    let content = req.body.content
    
    let post = new Post({
        author: currentuser,
        content: content
    })
    
    await post.save()

    res.send(post)
})