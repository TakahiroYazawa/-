const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
//console.log(todos);

if(todos){
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit",function(event){
    event.preventDefault();
    //console.log(input.value);
    add();
})

function add(todo){
    let todoText = input.value + 'さん';

    if(todo){
        todoText = todo.text ;
        todoCondition = todo.condition;
    }

    if(todoText){
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");
        console.log(todoText);
    
        const background = document.getElementById("selbox");

        if (background) {
            selboxValue = document.getElementById("selbox").value;
            if (selboxValue == "1") {
                li.style.background = '#FFABCE';
            }else if(selboxValue == "2"){
                li.style.background = '#FFFF99';
            }else if(selboxValue == "3"){
                li.style.background = '#AEFFBD';
            }else{
                li.style.background = '#DDDDDD';
            }
        }

        

        if (todo && todo.completed){
            li.classList.add("text-decoration-line-through")
        }

        if (todo && todo.condition){
            li.style.background = todo.condition;
        }

        li.addEventListener("contextmenu", function(event) {
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click", function(){
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        ul.appendChild(li);
        input.value ="";
        saveData();
    }
}

function saveData(){
    const lists = document.querySelectorAll("li");
    let todos = [];
    //console.log("fsd");
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through"),
            condition: list.style.background
        };
        console.log(list);
        console.log(todo.condition);
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}