var data = [{"item": "get milk"}, {"item": "walk dog"}, {"item": "kick some"}];

//用于从post中取出对象
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

//一个方面操作mongoose的库
let mongoose = require('mongoose');

//连接mongo
mongoose.connect('mongodb://127.0.0.1:27017/todolist');
mongoose.connection.on('connected', () => {
    console.log('连接成功')
});
mongoose.connection.on('error', (err) => {
    throw err;
    console.log('error')
});

//Model层，方便定义数据类型，方便维护，有利于健壮性
let todoSchema = new mongoose.Schema({
    item: String
});

//所操作的collection的名字
let Todo = mongoose.model('items', todoSchema);

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;
            //因为设置了模版引擎，express会自动从views目录下找
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        let itemOne = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
}
