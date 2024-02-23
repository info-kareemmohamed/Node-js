// node index.js add title=todolist body=todobody
// node index.js update id=1 title=todolist body=todobody
// node index.js list title=todolist body=todobody
// node index.js remove  id=1
const helper = require('./helper');

function main(args) {
    const [, , op, ...data] = args;
    helper.createDBFileIsNotExist();
    todoData = data.reduce((cum, elm, index, arr) => {
        [key, value] = elm.split('=');
        cum[key] = value;
        return cum;

    }, {})
    switch (op) {
        case 'add':
            helper.add(todoData);
            break;
        case 'update':
            helper.update(parseInt(todoData.id), todoData.title, todoData.body);

            break;
        case 'remove':
            helper.Delete(parseInt(todoData.id));
            break;
        case 'check':
            helper.toggleTodo(parseInt(todoData.id), true);
            break;
        case 'uncheck':
            helper.toggleTodo(parseInt(todoData.id), false);
            break;
        case 'list':

            helper.listTodos(todoData.type);
            break;
        default:
            console.log('Invalid command!');

    }


}



main(process.argv)




