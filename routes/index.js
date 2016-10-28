var express = require('express');
var router = express.Router();

var Todo = require('../mongo/index');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

//展示所有数据库中的数据
router.get('/api/todos', function (req, res) {
    Todo.find({},function(err,todos){
        if(err){
            res.send(err);
        }else{
            res.json(todos);
        }
    })
});

//点击保存 保存到数据库中
router.post('/api/todos', function (req, res) {

    var text = req.body.text;
    var _id = req.body._id;

    if(_id){
        //更新
        Todo.update({
            _id:_id,
        },{
            $set:{
                text:req.body.text
            }
        },function (err, todo) {
            if (err)
                res.send(err);
            else{
                Todo.find({},function(err,todos){
                    if(err){
                        res.send(err);
                    }else{
                        res.json(todos);
                    }
                })
            }
        })
    }else{
        //保存到数据库中
        Todo.create({
            text:text,
            // done:false
        }, function (err,todo) {
            if(err){
                res.send(err);
            }else{
                Todo.find({},function(err,todos){
                    if(err){
                        res.send(err);
                    }else{
                        res.json(todos);
                    }
                })
            }
        })
    }
})

//删除数据
router.get('/api/todos/:_id', function (req, res) {

    Todo.remove({
        _id: req.params._id
    }, function (err) {
        if (err) {
            res.send(err);
        }
        else{
            Todo.find({},function(err,todos){
                if(err){
                    res.send(err);
                }else{
                    res.json(todos);
                }
            })
        }
    });
});

//批量删除数据
router.post('/api/todos/batchDelete',function(req,res){
    var ids = req.body;
    console.log(ids)
    Todo.remove({_id:{$in:ids}},function(err){
        if (err)
            res.send(err);
        else{
            Todo.find({},function(err,todos){
                if(err){
                    res.send(err);
                }else{
                    res.json(todos);
                }
            })
        }
    });
});

module.exports = router;
