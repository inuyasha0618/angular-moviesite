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

MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

var movieModel = mongoose.model('movieModel',MovieSchema);
module.exports = movieModel;

