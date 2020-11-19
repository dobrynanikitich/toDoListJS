import './NewTask.css';

export default class NewTask {
    constructor() {}
    render() {
        const taskWrapper = document.createElement('div');
        taskWrapper.classList.add('task-wrapper');

        const newTask = document.createElement('div');
        newTask.classList.add('newtask-block');

        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('input-block--wrapper');

        const input = document.createElement('input');
        input.id = 'task-input';

        const button = document.createElement('button');
        button.classList.add('add-button');

        taskWrapper.appendChild(newTask);
        taskWrapper.appendChild(inputWrapper);
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(button);

        newTask.innerHTML ='Add new task';
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Enter your task');
        button.innerHTML = 'Add task';

        return taskWrapper; 
    }
}