var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	title: String,
	director: String,
	country: String,
	language: String,
	poster: String,
	flash: String,
	summary: String,
	year: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type:Date,
			default: Date.now()
		}
	}
});


MovieSchema.statics = {
	fetch: function(cb){
		return this
					.find({})
					.sort({'meta.updateAt':'-1'})
					.exec(cb)
	},
	findById: function(id,cb){
		return this
					.findOne({_id:id})
					.exec(cb);
	}

}

MovieSchema.pre('save',function(next){
	console.log("enter into save");
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

MovieSchema.pre('update',function(next){
	console.log("enter into update")
	this.meta.updateAt = Date.now();
	next();
});

var movieModel = mongoose.model('movieModel',MovieSchema);
module.exports = movieModel;

