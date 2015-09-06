
function createTag(tagname,data) {
	if (tagname!== undefined || tagname !== null){
		var starttag = '<'+tagname+'>';
		var endtag = '</'+tagname+'> \n';
		
		return starttag + data + endtag;
		
	}else {
		throw new Error("Tagname can't be empty");
	}
}

function createlistoftags(tagobject){
	var returnxml='';
	if (tagobject!==undefined || tagobject!==null){
		
		
		for (var property in tagobject) {
			if (tagobject.hasOwnProperty(property)) {
				if (typeof(tagobject[property])==="object"){
					// recurse 
					returnxml+=wraptag(property,createlistoftags(tagobject[property]));
				}else{
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
		return createTag(tagname,innercontent);
	}else {
		throw new Error("Wraptag innercontent must be a string");
	}
	
}

module.exports={
	Tag:createTag,
	TagList:createlistoftags,
	TagWrap:wraptag
}
