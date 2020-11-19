import './TasksList.css'; 

export default class TasksList {
    constructor(taskType, index, arr) {
        this.taskType = taskType;
        this.arr = arr;
        this.index = index;
    }

    render () {
        const list = document.createElement('ul');
        list.classList.add(`task-type--list`);
        list.id = this.taskType;

        const taskName = document.createElement('div');
        taskName.classList.add(`${this.taskType}-list`);
        taskName.innerHTML = this.taskType;

        list.appendChild(taskName);

        this.arr.map((item, i) => {
            let newTask = document.createElement('li');
            list.appendChild(newTask);
            newTask.classList.add(`task-menu`);
            newTask.setAttribute('draggable', true);
            newTask.id = +i;

            let textInput = document.createElement('input');
            textInput.classList.add('task-text--input');
            textInput.id = `${i}`
            textInput.setAttribute('type', 'text');
            textInput.value = item.value;

            newTask.appendChild(textInput);
            const changeTaskIcon = document.createElement('i');
            changeTaskIcon.classList.add('fas');
            changeTaskIcon.classList.add('fa-pen-square');

            newTask.appendChild(changeTaskIcon);
        });
        
        return list;
    }
}