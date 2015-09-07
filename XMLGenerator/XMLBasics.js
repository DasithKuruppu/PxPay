
function createTag(tagname,data) {
	if (tagname!== undefined || tagname !== null){
		var starttag = '<'+tagname+'>';
		var endtag = '</'+tagname+'> \n';
		
		return starttag + data + endtag;
		
	}else {
		throw new Error("Tagname can't be empty");
	}
}

function createlistoftags(tagobject,validator){
	
	if (validator === undefined) { 
		
		validator=function(propertyname,dataobject){
			
		}
	}else if (typeof(validator)!=="function"){
		
		throw new Error("validator needs to be a function, eg: function(propertyname,dataobject){ //do stuff }");
	}
	
	
	var returnxml='';
	if (tagobject!==undefined || tagobject!==null){
		
		for (var property in tagobject) {
			if (tagobject.hasOwnProperty(property)) {
				if (tagobject[property]!==null && typeof(tagobject[property]) ==="object"){					
					// recurse 	
					
					returnxml+=wraptag(property,createlistoftags(tagobject[property],validator));
				}else{
					
					validator(property,tagobject[property]);
					returnxml+=createTag(property,tagobject[property])
				}
				
			}
		}
		return returnxml;
	}else{
		throw new Error("Tagarray can't be empty");
	}
}


function wraptag(tagname,innercontent){
	if (typeof innercontent === 'string' || innercontent instanceof String){
		if (tagname !== undefined || tagname !== null) {
			var starttag = '<' + tagname + '> \n';
			var endtag = '</' + tagname + '> \n';

			return starttag + innercontent + endtag;

		} else {
			throw new Error("Tagname can't be empty");
		}
	}else {
		throw new Error("Wraptag innercontent must be a string");
	}
	
}

module.exports={
	Tag:createTag,
	TagList:createlistoftags,
	TagWrap:wraptag
}
