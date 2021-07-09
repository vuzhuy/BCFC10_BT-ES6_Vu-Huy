export default class ListTasks {
    addTasksApi(tasks) {
        return axios({
        url: "https://60ceefb54a030f0017f66e94.mockapi.io/TodoList",
        method: "POST",
        data: tasks,
        });
    }

    getListTasksApi() {
        return axios({
        url: "https://60ceefb54a030f0017f66e94.mockapi.io/TodoList",
        method: "GET",
        });
    }

    deleteTasksApi(id) {
        return axios({
        url: `https://60ceefb54a030f0017f66e94.mockapi.io/TodoList/${id}`,
        method: "DELETE",
        });
    }

    getTasksById(id) {
        return axios({
        url: `https://60ceefb54a030f0017f66e94.mockapi.io/TodoList/${id}`,
        method: "GET",
        });
    }

    updateTasksApi(tasks) {
        return axios({
        url: `https://60ceefb54a030f0017f66e94.mockapi.io/TodoList/${tasks.id}`,
        method: "PUT",
        data: tasks,
        });
    }
}