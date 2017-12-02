/* 
------------------
MAIN JS FILE
-----------------
*/

/* Object data with two arrays, one for todo tasks, second for archived tasks. If we have locally stored data, we have to load them.*/
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) :{
	todo:[],
	archived:[]
};

/* Function for clearing localStorage data. In everything works, it's commented.*/
//localStorage.clear();

console.log(data);

/* Calling function for rendering todo tasks which are locally stored.*/
renderTodoList();

input_forms = [ 'input-form-ifj', 'input-form-ial', 'input-form-itu',
				'input-form-inm', 'input-form-inp', 'input-form-ips',
				'input-form-izp', 'input-form-isu']

/* Global variables, we use them to add new todo task.*/
var subject_object;
var subject_name;
var subject_color;
var subject_activity;
var subject_info;

/* Function for displaying todo tasks. If it has extra parameter filter, we are filtering tasks by subject. If it's null we display all todo tasks.*/
function renderTodoList(filter)
{
	if(!data.todo.length)
		return;

	for(var i = 0; i < data.todo.length;i++)
	{
		var temp = JSON.parse(data.todo[i]);
		var name=temp.name;
		var color=temp.color;
		var activity=temp.activity;

		if((filter==null) || (filter===JSON.stringify(name)))
			addItemHTML(name, color, activity);
	}
}

/* Function for displaying archived tasks. Very similar to renderTodoList but we are working with different array,
 *  we don't filter tasks in archive and addItemHTML has extra parameter, which tell us that is archived tasks we want to display*/
function renderArchiveList()
{
	if(!data.archived.length)
		return;

	for(var i = 0; i < data.archived.length;i++)
	{
		var temp = JSON.parse(data.archived[i]);
		var name=temp.name;
		var color=temp.color;
		var activity=temp.activity;

		addItemHTML(name, color, activity, 1);

	}
}

/* Function for choosing and highlighting subject. We use global variables to store important data.*/
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
	
	subject_object = object;
	subject_name=subject_object.textContent;
	subject_color=subject_object.getAttribute('bgcolor');
}

/* Functions for storing infos of task to global variable.*/
function set_activity_info()
{
	subject_activity = document.getElementById("activity_info").value;
}
function set_further_info()
{
	subject_info = document.getElementById("further_info").value
}

/* This function is called whenever we change data to immediatly store data to local storage.*/
function dataObjectUptated()
{
	localStorage.setItem('todoList', JSON.stringify(data));
}

/* Function for converting record of RGB color to HEX record of color.*/
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/* Function for sending todo task to archive. We need to remove it from todo array and push it to archived array and undisplay it from screen.*/
function itemToArchive()
{
	var item = this.parentNode;
	var parent = item.parentNode;
	
	var name = item.children[0].textContent;
	var color = rgb2hex($(item).css("border-left-color"));
	var activity= item.children[1].textContent;
	var temp = {'name': name,'color': color,'activity': activity};

	data.todo.splice(data.todo.indexOf(JSON.stringify(temp)),1);
	data.archived.push(JSON.stringify(temp));
	dataObjectUptated();
	console.log(data);
	
	parent.removeChild(item);
}

/* Function for deleting task from archive. We need also to undisplay it from screen.*/
function itemFromArchiveDelete()
{
	var item = this.parentNode;
	var parent = item.parentNode;	
	
	var name = item.children[0].textContent;
	var color = rgb2hex($(item).css("border-left-color"));
	var activity= item.children[1].textContent;
	
	var temp = {'name': name,'color': color,'activity': activity};
	data.archived.splice(data.archived.indexOf(JSON.stringify(temp)),1);
	dataObjectUptated();
	console.log(data);
	
	parent.removeChild(item);
}

/* Function for adding HTML code of tasks. If we us extra parameter archived then we are generating code for archive task,
 *  which is little bit different then todo task.*/
function addItemHTML(name, color, activity, archived)
{
	/* Get subject list element */
	var ul = document.getElementById("subject_list");
		
	/* Create list item */
	var li = document.createElement("li");
	li.setAttribute('class','list-item');
	li.style.borderColor = color;
	ul.insertBefore(li, ul.childNodes[0]);
		
	/* Create subject header */
	var header = document.createElement("header");
	header.setAttribute('class','item-header');
	header.appendChild(document.createTextNode(name));
	li.appendChild(header);
		
	/* Set subject activity text */
	var div = document.createElement("div");
	div.setAttribute('class','item-info');
	div.appendChild(document.createTextNode(activity));
	li.appendChild(div);
		
	/* Create the 'Task complete' button */
	var button = document.createElement("button");
	button.setAttribute('class','item-button');
	li.appendChild(button);
		
	var i = document.createElement("i");
	i.setAttribute('class', "fa fa-fw fa-check");
	// <i class="fa fa-fw fa-check"></i>
	(archived)? button.addEventListener('click',itemFromArchiveDelete): button.addEventListener('click',itemToArchive)
	button.appendChild(i);	
	
}

/* Function for adding tasks by completing form. You have to enter all values and then click on button: Add new task,
 * values are reseted after clicking on button.*/
function add_new_task()
{
	/* All three variables are not empty */
	if (subject_object && subject_name && subject_color && subject_activity && subject_info)
	{
		addItemHTML(subject_name, subject_color, subject_activity);
		
		subject_object.style["-webkit-filter"] = "brightness(100%)";
		document.getElementById("activity_info").value='';
		document.getElementById("further_info").value='';

		//data.todo.push({'name': subject_name,'color': subject_color,'activity': subject_activity , 'info': subject_info});
		var temp={'name': subject_name,'color': subject_color,'activity': subject_activity};
		data.todo.push(JSON.stringify(temp));
		dataObjectUptated();
		console.log(data);
		
		subject_object=null;
		subject_name=null;
		subject_color=null;
		subject_activity=null;
		subject_info=null;
	}
	
	else
	{
		alert("Something's missing");
	}
}

/* This function is called whenever we want filter tasks by subjects.*/
$('#subjects_filtering .category').on('click', function(e) {
	if (e.target !== this)
		return;
  
	var name = (JSON.stringify(this.textContent));
	var parent =document.getElementById("subject_list");
  
	name = name.replace(/\s/g,'');
	name = name.replace(/\\n/g,'');

	$('#subject_list li').remove();
	
	/* If it is selected ALL then we render all todo tasks, when it's selected subject we are calling the same function but with extra parameter*/
	(! name.localeCompare(JSON.stringify('ALL'))) ? renderTodoList() : renderTodoList(name)
});

/* Function for displaying archive.*/
$('#archive').click(function() {
  
	$('#subject_list li').remove();
  
	renderArchiveList();
});
