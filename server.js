var express = require("express"),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
app = express(),
port = parseInt(process.env.PORT, 10) || 8080,
mongoose = require('mongoose'),
movieModel = require('./model/model.js'),
dbURI = 'mongodb://localhost/iMovie';

app.use(methodOverride()); 
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json()) 
app.use(express.static(__dirname + '/app')); 



mongoose.connection.on("connected",function(){
	console.log('mongoose connects to ' + dbURI + ' successfully!');
});
mongoose.connect(dbURI);

app.listen(port,function(){
	console.log('Now serving the app at http://localhost:' + port);
});

app.get('/data',function(req,res){
	movieModel.fetch(function(err,data){
		if(err) return console.log(err);
		res.json(data);
	});
});

app.get('/data/:id',function(req,res){
	var id = req.params.id;
	movieModel.findOne({_id:id},function(err,data){
		if(err) return console.log(err);
		res.json(data);
	});
})

app.post('/data/new',function(req,res){
	var item = req.body;
	var id = item._id;
	if(id != undefined){
		item.meta.updateAt = Date.now();
		movieModel.update({_id:id},item,function(err,num){
			if (err) {return console.log(err)};
			console.log("完成更新数："+num);
			movieModel.findOne({_id:id},function(err,data){
				if(err) return console.log(err);
				res.json(data);
			})
		})
	}else{
		new movieModel(item).save(function(err,newItem){
			if(err) return console.log(err);
			res.json(newItem);
		})
	}
})

app.delete('/data/:id',function(req,res){
	var id = req.params.id;
	movieModel.remove({_id:id},function(err,data){
		if(err) return console.log(err);
		res.json({"status":"success"});
	})
})