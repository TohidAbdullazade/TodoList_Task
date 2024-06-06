document.addEventListener("DOMContentLoaded", runToAllEvents)
const selectors = {
    form: document.getElementById("addTodoForm"),
    input: document.getElementById("addtodoInput"),
    addButton: document.getElementById("addtodoButton"),
    ul: document.querySelector("ul"),
};
const { form, input, addButton, ul } = selectors; // Destruct the props from selectors object


// ===> Run To ALl Events <===
function runToAllEvents() {
    form.addEventListener("submit", addTodo);

}
// ===> Add Todo Function <===
function addTodo(e) {
    e.preventDefault();
    let value = input.value.trim();
    if (!e.target) {
        throw new Error("The elements is'nt available")
    }
    if (value === "") {
        alert("Can't be empty")
    } else {
        createElements(value)
        let messageAlert = message("success", `Task: ${value} Added`)
        setTimeout(() => {
            messageAlert.remove()
        }, 1500)
        input.value = ''
    }
}
function createElements(value) {
    // ===> create List <===
    let list = document.createElement("li")
    list.setAttribute("class", "list-group-item  d-flex justify-content-between align-items-center");
    list.innerText = value;

    // ===> create Remove Icon <===
    let trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash text-danger"
    trashIcon.style.cursor = 'pointer'

    // create Complete Icon
    let completeİcon = document.createElement("i");
    completeİcon.className = "fa-solid fa-check text-success"
    completeİcon.style.cursor = 'pointer'

    // create Span for icons 
    let span = document.createElement("span");
    span.className = "d-flex gap-3"

    span.append(completeİcon, trashIcon)
    list.appendChild(span)
    ul.appendChild(list)

    if (trashIcon) {
        removeTodo(trashIcon, value)

    }
    if (completeİcon) {
        completeTodo(completeİcon, value)

    }
}
// ===> Remove The Todos <===
function removeTodo(removeButton, task) {
    removeButton.addEventListener("click", (e) => {
        if (e.target) {
            let list = e.target.parentElement.parentElement
            list.remove();
            let messageAlert = message("danger", `Task: ${task} Deleted`)
            setTimeout(() => {
                messageAlert.remove()
            }, 1500)
        }
    })
}
// ===> Target the  Completed Todo <===
function completeTodo(completeButton, todo) {
    completeButton.addEventListener("click", (e) => {
        if (e.target) {
            e.target.parentElement.parentElement.className = 'list-group-item  d-flex justify-content-between align-items-center bg-success'
            e.target.className = 'fa-solid fa-check text-light'
            let messageAlert = message("info", `Task: ${todo} Completed`)
            setTimeout(() => {
                messageAlert.remove()
            }, 1500)
        }
    })
}

// ===> Create a Alert Message <===
function message(type, text) {
    let div = document.createElement("div");
    div.className = `alert alert-${type}`
    div.innerText = text
    div.style.position = 'absolute'
    div.style.top = '0'
    div.style.width = '100%'
    document.body.appendChild(div)
    return div
}


