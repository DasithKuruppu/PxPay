var XMLbasic=require('./XMLBasics.js');
var Validation=require('./ValidateRequest.js');

function Transactionrequest(info){
	this.RequiredFeildsList=[];
	this.GenerateRequest={GenerateRequest:info};
	
	this.GetXMLRequest=function(){
		return XMLbasic.TagList(this.GenerateRequest,function (attribute, Dataobject) {
			
			
			if (this.RequiredFeildsList.indexOf(attribute) !== -1){
				
				Validation.presencecheck(attribute, Dataobject,{validAttribute:attribute,required:true});
			}else {
				Validation.presencecheck(attribute,Dataobject);
			}
			
		}.bind(this));
	}
	
}
//var Transactionrequest=

var RequestTest=new Transactionrequest({
	PxPayUserId:null,
	PxPayKey:null,
	AmountInput:'120'
	
});

RequestTest.RequiredFeildsList=['PxPayUserId','AmountInput'];

module.exports={
	initialise:RequestTest.GetXMLRequest()
};