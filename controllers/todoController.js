var data = [{"item":"get milk"},{"item":"walk dog"},{"item":"kick some"}];

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended:false});

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todolist');

//Model
let todoSchema = new mongoose.Schema({
    item:String
});

let Todo = mongoose.model('Todo',todoSchema);

let itemOne = Todo({item:'buy flowers'}).save(function (err) {
    if (err)throw err;
    console.log('item saved');
});

module.exports = function (app) {
    app.get('/todo',function (req, res) {
        //因为设置了模版引擎，express会自动从views目录下找
        res.render('todo',{todos:data});
    });

    app.post('/todo',urlencodedParser,function (req,res) {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item',function (req,res) {
        data = data.filter(function (todo) {
            return todo.item.replace(/ /g,"-") !== req.params.item;
        });
        console.dir(data);
        res.json(data);
    });
}
