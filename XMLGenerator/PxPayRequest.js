var XMLbasic=require('./XMLBasics.js');



var testitemlist={
	item1:'www',
	item2:'xxx',
	Fullname:{
		name:'dasith',
		initials:'k.d'
	}
}
//var Transactionrequest=

function getxml(){
	return XMLbasic.TagList(testitemlist);
	
}

module.exports={
	initialise:getxml
};