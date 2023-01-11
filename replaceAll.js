function replaceAll(str, find, replace, options) {
	var gx = 'g';
	var regExp = new RegExp('\\b' + find + '\\b','g');
	var new_replace = replace;
	var new_find = find.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&'); //escapeRegex
	
	if(options===undefined){
		return str.replace(new RegExp(new_find, gx), replace);
	}else{
		var opt = ['prefix_is','suffix_is','prefix_not','suffix_not','insensitive'];
		for (let i = 0; i < opt.length; i++) {
			if(options[opt[i]]===undefined){
				options[opt[i]] = '';
			}else{
				if(Object.prototype.toString.call(options[opt[i]]) === "[object String]"){ //https://stackoverflow.com/a/17772086
					options[opt[i]] = options[opt[i]].replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&'); //escapeRegex
				}
			}
		}
		
		if(options.insensitive === true){
			gx = 'gi';
		}else{
			gx = 'g';
		}
		if(options.prefix_is.length > 1 && options.suffix_is.length > 1){
			
			if(options.prefix_not.length > 1 && options.suffix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = replace;
			}else if(options.prefix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')('+options.suffix_is+')';
				new_replace = replace+'$3';
			}else if(options.suffix_not.length > 1){
				regExp = '('+options.prefix_is+')('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = '$1'+replace;
			}else{
				regExp = '('+options.prefix_is+')('+new_find+')('+options.suffix_is+')';
				new_replace = '$1'+replace+'$3';
			}
		}
		else if(options.prefix_is.length > 1){
			if(options.prefix_not.length > 1 && options.suffix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = replace;
			}else if(options.prefix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')';
				new_replace = replace;
			}else if(options.suffix_not.length > 1){
				regExp = '('+options.prefix_is+')('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = '$1'+replace;
			}else{
				regExp = '('+options.prefix_is+')('+new_find+')';
				new_replace = '$1'+replace;
			}
		}
		else if(options.suffix_is.length > 1){
			if(options.prefix_not.length > 1 && options.suffix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = replace;
			}else if(options.prefix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')('+options.suffix_is+')';
				new_replace = replace+'$3';
			}else if(options.suffix_not.length > 1){
				regExp = '('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = replace;
			}else{
				regExp = '('+new_find+')('+options.suffix_is+')';
				new_replace = replace+'$2';
			}
		}
		else{
			if(options.prefix_not.length > 1 && options.suffix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = replace;
			}else if(options.prefix_not.length > 1){
				regExp = '(?<!('+options.prefix_not+'))('+new_find+')';
				new_replace = replace;
			}else if(options.suffix_not.length > 1){
				regExp = '('+new_find+')(?!('+options.suffix_not+'))';
				new_replace = replace;
			}else{
				regExp = '('+new_find+')';
				new_replace = replace;
			}
		}
		
		return str.replace(new RegExp(regExp, gx), new_replace);
	}
}

	//example: replaceAll('123hedi456 abchediefg 123hedi abchedi hedi456 hediefg 123Hedi456', 'hedi', '****', {prefix_is:'123',suffix_is:'456',prefix_not:'123',suffix_not:'456',insensitive:true})
	//result: '123hedi456 abc****efg 123hedi abc**** hedi456 ****efg 123Hedi456';
