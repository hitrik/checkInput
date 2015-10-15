jQuery(function() {
	var regHelper = {
		//Regexp edit by user, like he wants
		"string": /\S/gm,
		"phone": /\d{5,11}/gm
	};
	var errs = {
		"string" : "Поле должно содержать символы",
		"phone": "Введите корректный телефон",
		"errors": []
	};
	var testExpr = function(str, regExp) {
		return !regExp.test(str);
	};
	//1 argument is selector-container for input fields
	var testInp = function() {
		errs.errors.length = 0;
		var args = [].slice.call(arguments);
		if(!args && args.length < 1) {
			return false;
		}
		var fields = $(args[0]).find("input");
		fields.each(function(i, elem) {
			var el = $(elem);
			if(testExpr(el.val(), regHelper[el.attr("data-type")])) {
				console.log("error");
				errs.errors.push(errs[el.attr("data-type")]);
			}
		});
		if(errs.errors.length > 0) {
			var content = "";
			errs.errors.forEach(function(item) {
				content += "<div class='err'>" + item + "</div>";
			});
			//hardcode container for output error and success messages
			$(".errors").html(content);
		} else {
			fields.each(function(i, item) {
				$(item).val("");
			});
			$(".errors").html("Все четко, данные улетели.");
		}
	};
	//test click
	$("button").on("click", function() {
		testInp("body");
	});
}($));