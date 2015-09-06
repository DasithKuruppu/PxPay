function createTag(tagname,data) {
	if (tagname!== undefined || tagname !== null){
		var starttag = '<'+tagname+'>';
		var endtag = '</'+tagname+'>';
		
		return starttag + data + endtag;
		
	}else {
		throw new Error("Tagname can't be empty");
	}
}

function createlistoftags(tagarray){
	var returnxml='';
	if (tagarray!==undefined || tagarray!==null){
		tagarray.forEach(function(element,index) {
			returnxml+=createTag(tagarray.tagname,tagarray.data) + '\n';			
		}, this);
	}else{
		throw new Error("Tagarray can't be empty");
	}
}