/* 
------------------
MAIN JS FILE
-----------------
*/

input_forms = [ 'input-form-ifj', 'input-form-ial', 'input-form-itu',
				'input-form-inm', 'input-form-inp', 'input-form-ips',
				'input-form-izp', 'input-form-isu']


/* Add new task variables */
var subject_name;
var subject_object;
var subject_activity;
var subject_info;



function choose_subject_to_add(object_id)
{
	/* Firstly, reset brightness to default values */
	for (var i = 0; i < input_forms.length; i++)
	{
		document.getElementById(input_forms[i]).style["-webkit-filter"] = "brightness(100%)";
	}

	/* Then highlight the selected input form cell */
	var object = document.getElementById(object_id)
	object.style["-webkit-filter"] = "brightness(150%)";
	
	subject_name = object.textContent;
	subject_object = object;
}

function set_activity_info()
{
	subject_activity = document.getElementById("activity_info").value;
}

function set_further_info()
{
	subject_info = document.getElementById("further_info").value
}

function add_new_task()
{
	/* All three variables are not empty */
	if (subject_name && subject_activity && subject_info)
	{
		/* Get subject list element */
		var ul = document.getElementById("subject_list");
		
		/* Create list item */
		var li = document.createElement("li");
		li.setAttribute('class','list-item');
		li.style.borderColor = subject_object.getAttribute('bgcolor');
		ul.appendChild(li);
		
		/* Create subject header */
		var header = document.createElement("header");
		header.setAttribute('class','item-header');
		header.appendChild(document.createTextNode(subject_name));
		li.appendChild(header);
		
		/* Set subject activity text */
		var div = document.createElement("div");
		div.setAttribute('class','item-info');
		div.appendChild(document.createTextNode(subject_activity));
		li.appendChild(div);
		
		/* Create the 'Task complete' button */
		var button = document.createElement("button");
		button.setAttribute('class','item-button');
		li.appendChild(button);
		
		var i = document.createElement("i");
		i.setAttribute('class', "fa fa-fw fa-check");
		// <i class="fa fa-fw fa-check"></i>
		button.appendChild(i);
	}
	
	else
	{
		alert("Something's missing");
	}
}
