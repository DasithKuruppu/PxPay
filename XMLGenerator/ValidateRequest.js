function error(Attribute,errortype,message){
		return {
			error:{
				message:message,
				type:errortype,
				location:Attribute
			}
		}
}
	
		//required feild checks
				
function presencecheck(Attribute,data,validation){
		// validation is an optional argument defaults to below object
		
		if (validation === undefined) { validation = {
				validAttribute:Attribute,
				required:false
			};
		}			
		if (Attribute === undefined || data === undefined){
			 throw new Error("Required argument not specified in the function");	
		}
			
		if ((data == null || data == '') && validation.required == true){
			throw new Error("Required feild "+Attribute+" not present");
			
		}		
}		
		

module.exports={
	presencecheck:presencecheck	
}