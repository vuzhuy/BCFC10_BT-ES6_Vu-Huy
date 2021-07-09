import Tasks from "./Tasks.js";
import ListTasks from "./ListTasks.js";

const listTasks = new ListTasks ();

const getEle = (id) => {
    return document.getElementById(id);
};

const renderList = (arr) => {
    return arr.reduce((contentHTML, item) => {
    return (contentHTML += `
        <li>
            <span class="textTasks">${item.text}</span>
            <span class="checkItem">
            <span class="editItem">
                <span onclick="editItem(${item.id})" class="update-btn fas fa-pen" title="Edit Tasks"></span>
                <span onclick="deleteItem(${item.id})" class="delete-btn far fa-trash-alt" title="Delete Tasks"></span>
                <span class="fa fa-check-circle" onclick="checkItem(${item.id})" title="Check Tasks"></span>
            </span>
        </li>
        `);
    }, "");
};

const fetchData = () => {
    listTasks
        .getListTasksApi()
        .then((result) => {
            let todo = [];
            let completed = [];

            result.data.forEach((status) => {
            if (status.checked === false) {
                todo.push(status);
            } else {
                completed.push(status);
            }
        });

        getEle("todo").innerHTML = renderList(todo);
        getEle("completed").innerHTML = renderList(completed);
        getEle("newTasks").value = "";
        })
        .catch((error) => {
        console.log(error);
        });
};
fetchData();

// Thêm Tasks
const addItem = () => {
    let text = getEle("newTasks").value;

    const tasks = new Tasks("", text, false);

    if (text.trim() !== "") {
    listTasks
        .addTasksApi(tasks)
        .then(() => {
            fetchData();
        })
        .catch((error) => {
            console.log(error);
        });
    } else {
        alert("Enter an activity...");
    }
};
window.addItem = addItem;

// Xóa Task
const deleteItem = (id) => {

    listTasks
    .deleteTasksApi(id)
    .then(() => {
        fetchData();
    })
    .catch((error) => {
        console.log(error);
    });
};
window.deleteItem = deleteItem;

// Sửa Task
const editItem = (id) => {
    listTasks
    .getTasksById(id)
    .then((result) => {
        getEle("newTasks").value = result.data.text;
        document.getElementsByClassName("card__add")[0].classList.add("change");

        getEle("addItem").innerHTML = `
        <i class="fas fa-sync-alt" onclick="updateItem(${id})" title="Update Tasks"></i>
        `;
    })
    .catch((error) => {
        console.log(error);
    });
};
window.editItem = editItem;

//Cập nhật Task
const updateItem = (id, checked) => {
    let text = getEle("newTasks").value;

    const tasks = new Tasks(id, text, checked);

    if (text.trim() !== "") {
    listTasks
        .updateTasksApi(tasks)
        .then(() => {
        fetchData();
        document
            .getElementsByClassName("card__add")[0]
            .classList.remove("change");

        getEle(
            "addItem"
        ).innerHTML = `<i class="fas fa-plus" onclick="addItem()"></i>`;
        })
        .catch((error) => {
        console.log(error);
        });
    } else {
    alert("Enter an activity...");
    }
};
window.updateItem = updateItem;

// Kiểm tra Task
const checkItem = (id, text) => {

    listTasks
    .getTasksById(id)
    .then((result) => {
        let isChecked = false;
        if (isChecked === result.data.checked) {
            isChecked = true;
        }
        const tasks = new Tasks(id, text, isChecked);
        listTasks
        .updateTasksApi(tasks)
        .then(() => {
            fetchData();
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};
window.checkItem = checkItem;


