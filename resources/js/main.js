// Getting all required elements 
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0) {//if user values aren't only spaces 
        addBtn.classList.add("active");//active the add button
    } else {
        addBtn.classList.remove("active");//unactive the add button
    }
}

showTasks();//calling showTask()

//if user click on the add button 
addBtn.onclick = () => {
    let userData = inputBox.value;//getting user entered value
    let getLocalStoarage = localStorage.getItem("New Todo"); //gettin localstorage
    if(getLocalStoarage == null) {
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStoarage); //transforming json string into a js object
    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();//calling showTask()
    addBtn.classList.remove("active");//unactive the add button
}

// function to add task list inside ul
function showTasks(){
    let getLocalStoarage = localStorage.getItem("New Todo"); //gettin localstorage
    if(getLocalStoarage == null) {
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStoarage); //transforming json string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
    if(listArr.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;//adding new li tag inside ul tag
    inputBox.value = "";//once task added leave the input field blank
}

//delete task function
function deleteTask(index) {
    let getLocalStoarage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStoarage);
    listArr.splice(index, 1);//delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();//calling showTaks()
}

//delete all tasks function 
deleteAllBtn.onclick = () => {
    listArr = []; // empty the array
    //after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();//calling showTaks()
}