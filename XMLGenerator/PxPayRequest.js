var XMLbasic=require('./XMLBasics.js');
var Validation=require('./ValidateRequest.js');
var https=require('https');

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
	this.SendRequest=function(callback){
		var XML= this.GetXMLRequest(); // ensures prerequisite info is available before sending request
		if(XML!==undefined || XML!==null){
			// Specify Options
			var options = {
				hostname: 'sec.paymentexpress.com',
				path: '/pxpay/pxaccess.aspx',
				method: 'POST',
				headers: { 
					'ContentType': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(XML)
					 }
			};
			
			var req = https.request(options, function (response) {
				var str = ''
				response.setEncoding('utf8');
				response.on('data', function (chunk) {
					
					str += chunk;
				});
				
				response.on('end', function () {
					var Responseobj= new responsewrapper();
					Responseobj._XMLresponse=str;
					
					callback(null,Responseobj);
				});
				
			});
			
			req.on('error', function (e) {
				callback(e);
			});
			
			
			req.write(XML);
			console.log(XML);
			req.end();			
		}
		
	}
	
	var responsewrapper=function(){
		this._XMLresponse='',
		this.isvalid=function(){
			if (this._XMLresponse.indexof('<Request valid="1">')!==-1){
				return true;
			}else {
				return false;
			}
		}
		this.getURI=function(){
			
			var Regex = /<URI>(.+)<\/URI>/g;
			var match = Regex.exec(this._XMLresponse);
			if (match!= null){
				return match[1];
			}else{
				return null;
			}
			
		}
			
	};
	
}
Transactionrequest.prototype.URL='https://sec.paymentexpress.com/pxpay/pxaccess.aspx';

//var Transactionrequest=

var RequestTest=new Transactionrequest({
	PxPayUserId:'TestAccount',
	PxPayKey:'dc339b3126c8fbadf4b30b498ded6a62a17b5f831e3111116bd8e332c730bbc8',
	AmountInput:'2.06',
	CurrencyInput:'NZD',
	MerchantReference:'Test Transaction',
	EmailAddress:'',
	TxnData1:'28 Grange Rd',
	TxnData2:'Auckland',
	TxnData3:'NZ',
	TxnType:'Purchase',
	TxnId:'P777575CA3DDA78C',
	BillingId:'',
	EnableAddBillCard:'0',
	UrlSuccess:'http://www.mycompany.com/success.cfm',
	UrlFail:'http://www.mycompany.com/fail.cfm',
	Opt:'TO=0901142221'
	
});

RequestTest.RequiredFeildsList=['PxPayUserId','PxPayKey','AmountInput','CurrencyInput','TxnType','UrlFail','UrlSuccess'];


module.exports=RequestTest;