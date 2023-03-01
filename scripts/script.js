"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const headerButton = document.querySelector(".header-button");

let todoData = JSON.parse(localStorage.getItem("your tasks")) || [];

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";
  headerInput.value = "";
  if (todoData !== null) {
    todoData.forEach(function (item, index) {
      const li = document.createElement("li");
      li.classList.add("todo-item");

      li.innerHTML =
        '<span class="text-todo">' +
        item.value +
        "</span>" +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        "</div>";

      todoList.append(li);

      if (item.completed) {
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }

      const btnTodoCompleted = li.querySelector(".todo-complete");
      btnTodoCompleted.addEventListener("click", function () {
        item.completed = !item.completed;

        render();
        localStorage.setItem("your tasks", JSON.stringify(todoData));
      });

      const todoRemove = li.querySelector(".todo-remove");
      todoRemove.addEventListener("click", function () {
        todoData.splice(index, 1);
        render();
        localStorage.setItem("your tasks", JSON.stringify(todoData));
      });
    });
  }
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  if (headerInput.value !== "") {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };

    todoData.push(newTodo);
    localStorage.setItem("your tasks", JSON.stringify(todoData));
  }
  render();
});

render();
