import NewTask from './newTask/NewTask';
import TasksList from './tasksList/TasksList';
import './InitialApp.css';

export default class InitialApp {
    render(state) {
        let cNode = document.querySelector('body');
        cNode.innerHTML = '';
        const container = document.createElement('div');
        container.classList.add('container-app');

        const header = document.createElement('header');
        header.classList.add('header-app');
        const headerName = document.createElement('span');

        const listWrapper = document.createElement('section');
        listWrapper.classList.add('todolist-wrapper');

        document.body.appendChild(container);
        container.appendChild(header);
        container.appendChild(listWrapper);
        header.appendChild(headerName);
        headerName.innerHTML = 'Welcome to your own to do list';

        const newTaskBlock = new NewTask();
        const newTaskWindow = newTaskBlock.render();
        listWrapper.appendChild(newTaskWindow);

        const tasksBlock = document.createElement('section');
        tasksBlock.classList.add('tasks-wrapper');
        container.appendChild(tasksBlock);

        Object.keys(state).map((item, i) => {
            tasksBlock.appendChild(new TasksList(item, i, state[item]).render());
        })
    }
}