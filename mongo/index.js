
var mongoose=require('mongoose');
var connect=mongoose.connect('mongodb://127.0.0.1/todo2');
var Schema=mongoose.Schema;
var ObjectId=Schema.ObjectId;

var todo2Schema=new Schema({
    text:String
},{collection:'todo'})

var Todo=connect.model('todo',todo2Schema);
module.exports=Todo;


