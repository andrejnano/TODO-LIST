/* 
------------------
MAIN JS FILE
-----------------
*/

input_forms = [ 'input-form-ifj', 'input-form-ial', 'input-form-itu',
				'input-form-inm', 'input-form-inp', 'input-form-ips',
				'input-form-izp', 'input-form-isu']


function highlight(object_id)
{
	/* Firstly, reset brightness to default values */
	for (var i=0; i<input_forms.length; i++)
	{
		document.getElementById(input_forms[i]).style["-webkit-filter"] = "brightness(100%)";
	}

	/* Then highlight the selected input form cell */
	var cell = document.getElementById(object_id);
	cell.style["-webkit-filter"] = "brightness(125%)";
}

