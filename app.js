let express = require('express');

/**
 * controllers 跟请求相关的都放到这里
 */
let todoController = require('./controllers/todoController');

//实例化express
let app = express();

//设置模版引擎
app.set('view engine','ejs');

//使用静态文件
app.use(express.static('./public'));

todoController(app);

//监听3000
app.listen(3000);

console.log('You are listening to port 3000');
