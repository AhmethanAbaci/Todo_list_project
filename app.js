const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const cardBody = document.querySelector('.card-body');
const firstCardBody = document.querySelectorAll('.list-group')[0];
const secondCardBody = document.querySelectorAll('.list-group')[1];
const clearButton = document.querySelector('#clearButton');
const filterInput = document.querySelector("#todoSearch");let todos=[];

runEvents();

function runEvents()
{
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    todoList.addEventListener("click",removeTodoUI);
    clearButton.addEventListener("click",removeAllTodos)
    filterInput.addEventListener("keyup", filter);
}
function filter(e)
{
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item")
    if(todoListesi.length>0)
        {
            todoListesi.forEach(function(todo)
            {
                if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                    todo.setAttribute("style","display:block");
                }
                else{
                    todo.setAttribute("style","display :none !important");

                }
            })
        }
        else
        {
            showAlert("warning","en az bir todo olmalıdır.")
        }
}
function addTodo(e)
{
    const inputText= addInput.value.trim();
    if(inputText==null || inputText=="")
        {
            showAlert("warning","Lütfen bir todo ekleyiniz")       
        }
        else{
            addTodoUI(inputText)
            addTodoStorage(inputText)
            showAlert("success","Todo eklendi");
        }
        
     

    //storage ekleme
    e.preventDefault();
}

function removeAllTodos(){

 const Todoslist = document.querySelector(".list-group");

 while(Todoslist.firstElementChild!==null)
    {
        Todoslist.removeChild(Todoslist.firstElementChild);
    }
localStorage.removeItem("todos")

}

function removeTodoUItoStorage(removeTodo)
{
    checkTodoFromStorage();
    todos.forEach(function(todo,index)
    {
        if(removeTodo===todo)
            {
                todos.splice(index,1)
            }
    });
    localStorage.setItem("todos",JSON.stringify(todos))
}


function addTodoUI(newTodo)
{
const li =document.createElement("li")
li.className="list-group-item d-flex justify-content-between"
li.textContent=newTodo;

const a = document.createElement("a");
a.href="#";
a.className="delete-item";

const i =document.createElement("i")
i.className="fa fa-remove";

a.appendChild(i);
li.appendChild(a);

todoList.appendChild(li);

}

function addTodoStorage(newTodo){

  checkTodoFromStorage();
  todos.push(newTodo)
  localStorage.setItem("todos",JSON.stringify(todos));
    
}
function checkTodoFromStorage()
{   
    if(localStorage.getItem("todos") ==null)
        { 
           todos=[];
        }
        else
        {
            todos = JSON.parse(localStorage.getItem("todos"));
        }  
}



function showAlert(type,message)
{
    const div = document.createElement("div")
    // div.className="alert alert-"+type;
    div.className= `alert alert-${type}`;
    div.role="alert"
    div.textContent=message;
    firstCardBody.appendChild(div);
    setTimeout(function()
    {
        div.remove();
    },2500)
}

function pageLoaded()
{
    checkTodoFromStorage();
    todos.forEach(function(todo){
    addTodoUI(todo)}
)
}

function removeTodoUI(e)
{
    if(e.target.className==="fa fa-remove")
        {
          const todo = e.target.parentElement.parentElement;
          todo.remove();

          removeTodoUItoStorage(todo.textContent)
          showAlert("success","todo silindi")
        }
    
}

