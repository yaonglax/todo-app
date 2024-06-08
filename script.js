const list = document.getElementById("list");
const createBtn = document.getElementById("create");
const todoList = document.getElementById("todo-list");
const toggle1 = document.getElementById("toggle-1");
const toggle2 = document.getElementById("toggle-2");
const toggle3 = document.getElementById("toggle-3");
const main = document.getElementById("main");
const cover = document.getElementById("cover");
const h1 = document.getElementById("h1-title");
const divNotes = document.querySelectorAll(".todo")

const h = new Date().getHours();

function scrollToBottom() {
    const scrollTarget = document.getElementById('bottom');
    scrollTarget.scrollIntoView({ behavior: 'smooth' });
}

let allToDo = JSON.parse(localStorage.getItem('allToDo')) || [];

const renderToDo = () => {
    const totalCount = allToDo.length;
    
    const notesHTML = allToDo.map((note) => {
        const doneClass = note.done ? ' style="text-decoration: line-through var(--li-color);"' : '';
        return `<div class="rubik-bubbles-regular todo" ondblclick='done(${note.id})' id="todo-${note.id}"${doneClass}>${note.content}
            <div class="buttons">
                <button id="edit-btn" onclick="editNote(${note.id})"></button>
                <button id="delete-btn" onclick="deleteToDo(${note.id})"></button>
            </div></div>`;
    }).join("");
    const noToDo = `<div class="gaegu-regular empty" id="empty-title">List is empty!</div>`;
    todoList.innerHTML = totalCount < 1 ? noToDo : notesHTML;
};
renderToDo();

const addToDo = () => {
    createBtn.disabled = true;
    let editBtns = document.querySelectorAll("#edit-btn");
    let deleteBtns = document.querySelectorAll("#delete-btn");
    editBtns.forEach(button => button.disabled = true);
    deleteBtns.forEach(button => button.disabled = true);

    const newDiv = document.createElement("div");
    newDiv.classList.add("rubik-bubbles-regular", "todo");

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.classList.add("input-todo", "rubik-bubbles-regular");
    newDiv.appendChild(newInput);

    const saveBtn = document.createElement("button");
    saveBtn.id = 'check-btn';
    newDiv.appendChild(saveBtn);
    todoList.append(newDiv);

    saveBtn.addEventListener("click", () => {
        const newContent = newInput.value.trim();
        if (newContent) {
            const newId = allToDo.length + 1;
            allToDo.push({ id: newId, content: newContent, done: false });
            localStorage.setItem('allToDo', JSON.stringify(allToDo));
            createBtn.disabled = false;
            renderToDo();
        } else {
            newInput.placeholder = "Введите текст!";
        }
    });

    newInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            saveBtn.click();
        }
    });
};

const deleteToDo = (id) => {
    allToDo = allToDo.filter((note) => note.id !== id);
    localStorage.setItem('allToDo', JSON.stringify(allToDo));
    renderToDo();
};

const editNote = (id) => {
    createBtn.disabled = true;
    let editBtns = document.querySelectorAll("#edit-btn");
    let deleteBtns = document.querySelectorAll("#delete-btn");
    editBtns.forEach(button => button.disabled = true);
    deleteBtns.forEach(button => button.disabled = true);

    const editDiv = document.getElementById(`todo-${id}`);
    const editInfo = editDiv.textContent.trim();
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = editInfo;
    editInput.classList.add("input-todo", "rubik-bubbles-regular");
    editDiv.textContent = "";
    editDiv.appendChild(editInput);

    const saveBtn = document.createElement("button");
    saveBtn.id = 'check-btn';
    saveBtn.addEventListener("click", () => {
        const newContent = editInput.value.trim();
        if (newContent) {
            const editId = allToDo.findIndex(note => note.id === id);
            allToDo[editId].content = newContent;
            localStorage.setItem('allToDo', JSON.stringify(allToDo));
            createBtn.disabled = false;
            renderToDo();
        } else {
            editInput.placeholder = "Введите текст!";
        }
    });

    editInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            saveBtn.click();
        }
    });

    editDiv.appendChild(saveBtn);
};
const emptyTitle = document.getElementById("empty-title");

toggle1.addEventListener("click", () => {
    const currentTheme = document.body.className;
    if (currentTheme === 'dawn-theme' || currentTheme === 'dark-theme') {
        document.body.classList.remove('dawn-theme') || document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        cover.style.backgroundImage = 'url("./image/cover-bg.png")'
        main.style.backgroundImage = 'url("./image/bg.png")'
    }
    else {
        document.body.className = currentTheme;
    }
})
// function toDawn(id) {
toggle2.addEventListener("click", () => {
    const currentTheme = document.body.className;
    if (currentTheme === 'light-theme' || currentTheme === 'dark-theme') {
        document.body.classList.remove('light-theme') || document.body.classList.remove('dark-theme');
        document.body.classList.add('dawn-theme');
        console.log(document.body.className)
        cover.style.backgroundImage = 'url("./image/cover-bg2.png")'
        main.style.backgroundImage = 'url("./image/bg-2.png")'
    }
    else {
        document.body.className = currentTheme;
    }
})

toggle3.addEventListener("click", () => {
    const currentTheme = document.body.className;
    if (currentTheme === 'light-theme' || currentTheme === 'dawn-theme') {
        document.body.classList.remove('dawn-theme') || document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        cover.style.backgroundImage = 'url("./image/cover-bg3.png")'
        main.style.backgroundImage = 'url("./image/bg-3.png")'}
    else {
        document.body.className = currentTheme;
    }
})
function done(id) {
    
    const  editId = allToDo.findIndex(note => note.id === id);
    console.log(allToDo[editId].done)
    allToDo[editId].done = true;
    if (allToDo[editId].done == true) {
        const editDiv = document.getElementById(`todo-${id}`);
        localStorage.setItem('allToDo', JSON.stringify(allToDo));
        editDiv.style.textDecoration = "line-through var(--li-color)";
    }
    }  
// var check = function () {
// const hours = new Date().getHours();
// if (hours >= 17 && hours <= 20) {
// cover.style.backgroundImage = 'url("cover-bg3.png")';
// main.style.backgroundImage = 'url("bg-3.png")'}
// document.body.classList.add('dark-theme');
// document.body.classList.remove('light-theme') || document.body.classList.remove('dawn-theme') ;
// }

// setInterval(check, 60000); // выполняется раз в минуту, чтобы не слишком нагружать
// check();

if (h >= 17 || h <= 10 ) {
    document.body.classList.add('dark-theme');
    cover.style.backgroundImage = 'url("./image/cover-bg3.png")'
    main.style.backgroundImage = 'url("./image/bg-3.png")'}
    else {
        document.body.classList.add('light-theme');
        cover.style.backgroundImage = 'url("./image/cover-bg.png")'
        main.style.backgroundImage = 'url("./image/bg.png")';
    }
console.log(document.body.className)
console.log(allToDo)
createBtn.addEventListener("click", addToDo);

