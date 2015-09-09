var PxPayRequest=require('./XMLGenerator/PxPayRequest.js');

PxPayRequest.SendRequest(function(err,response){
	if (err){
		console.log('error occured');
		return console.log(err);
	}
	console.log(response.getURI());
});