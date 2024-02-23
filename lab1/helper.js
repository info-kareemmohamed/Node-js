

const fs = require("fs");
const { json } = require("stream/consumers");
const FILE_PATH = process.env.FILE_PATH || "./db.json";
let todos = [];
function createDBFileIsNotExist() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
  todos = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

}
const saveTodos = () => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos));
};


function add(data) {
  const todo = {
    id: todos.length + 1,
    title: data.title,
    body: data.body,
    checked: false
  }
  todos.push(todo);

  saveTodos();
}




const update = (todoId, title, body) => {
  const index = todos.findIndex(todo => todo.id === todoId);

  if (index !== -1) {
    todos[index].title = title;
    todos[index].body = body;
    saveTodos();
    console.log('Todo edited successfully!');
  } else {
    console.log('Todo not found!');
  }
};


const Delete = (todoId) => {
  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodos();
    console.log('Todo removed successfully!');
  } else {
    console.log('Todo not found!');
  }
};



const listTodos = (filter) => {
  let filteredTodos = [];
  switch (filter) {
    case 'all':
      filteredTodos = todos;
      break;
    case 'checked':
      filteredTodos = todos.filter(todo => todo.checked);
      break;
    case 'unchecked':
      filteredTodos = todos.filter(todo => !todo.checked);
      break;
    default:
      console.log('Invalid filter!');
      return;
  }

  console.log('List of todos:');
  console.log(filteredTodos);
};


const toggleTodo = (todoId, checked) => {

  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todos[index].checked = checked;
    saveTodos(todos);
    console.log('Todo status updated successfully!');
  } else {
    console.log('Todo not found!');
  }
};






module.exports = {
  add: add,
  update: update,
  Delete: Delete,
  createDBFileIsNotExist: createDBFileIsNotExist,
  listTodos: listTodos,
  toggleTodo: toggleTodo
};