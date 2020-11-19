import InitialApp from "../view/InitialApp";

import '../view/tasksList/TasksList.css';

export default class ControllerApp {
    constructor() {
        this.initialApplication = new InitialApp();
        this.setState();
    }

    state = {
        backlog: [],
        inProgress: [],
        done: [],
        bucket: [],
    };

    currentList;
    selectedNodePosition = 0;

    setState() {
        this.initialApplication.render(this.state);
        this.addEventListener();
    }

    addEventListener() {
        const addTaskButton = document.querySelector('.add-button');
        addTaskButton.addEventListener('click', () => this.addTaskToBacklog());

        const inputTask = document.querySelectorAll('.task-text--input');
        if (inputTask) {
            inputTask.forEach(item => item.addEventListener('change', (e) => this.changeInputValue(e.currentTarget)))
        }

        const listItem = document.querySelectorAll('.task-menu');
        const taskStatus = document.querySelectorAll('.task-type--list');
        listItem.forEach(item => item.addEventListener('dragstart', (e) => this.dragStart(e)));
        listItem.forEach(item => item.addEventListener('dragend', (e) => this.dragEnd(e)));
        listItem.forEach(item => item.addEventListener('dragover', (e) => this.dragOverListItem(e)));
        taskStatus.forEach(item => item.addEventListener('dragover', (e) => this.dragOver(e)));
        taskStatus.forEach(item => item.addEventListener('dragenter', (e) => this.dragEnter(e)));
        taskStatus.forEach(item => item.addEventListener('dragleave', (e) => this.dragLeave(e)));
        taskStatus.forEach(item => item.addEventListener('drop', (e) => this.dragDrop(e)));
    }

    addTaskToBacklog = () => {
        const input = document.querySelector('#task-input');
        if (input.value) {
            this.state.backlog.push({
                id: this.state.backlog.length,
                value: input.value
            });
            input.value = '';
            this.setState();
        }
    }
    
    // changeInputValue = (e) => {
    //     const listTasks = Object.keys(this.state);
    //     const arrElToChange = listTasks[e.parentNode.parentNode.id];
    //     console.log(arrElToChange);
    //     this.state[arrElToChange].splice(e.id, 1, e.value);
    // }

    dragOverListItem = (e) => {
        e.preventDefault();
        this.checkListPosition(e.clientY);
    }

    checkListPosition = (currentPos) => {
        this.establishNodePosition();
        console.log('currentPos', currentPos);
        const listItem = document.querySelectorAll('.task-menu');
        let nodeAbove;
        listItem.forEach((node, i) => {
            if (node['yPos'] < currentPos) {
                nodeAbove = document.getElementById(node.id);
                this.selectedNodePosition = i + 1;
            }
        });
        if (nodeAbove === undefined) {
            this.selectedNodePosition = 0;
        }
        console.log(this.selectedNodePosition)
    }

    establishNodePosition = () => {
        const listItem = document.querySelectorAll('.task-menu');
        listItem.forEach(node => {
            let el = document.getElementById(node.id);
            let position = el.getBoundingClientRect();
            let yTop = position.top;
            let yBottom = position.bottom;
            let yCenter = yTop + ((yBottom - yTop) / 2);
            node['yPos'] = yCenter;
            console.log(`this is my ${el}`, node['yPos']);
        })
    }

    dragStart = (e) => {
        this.currentList = e.target.parentNode.id;
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    dragEnd = (e) => {
        if (e.target.classList.contains('hide')) {
            e.target.classList.remove('hide');
        }
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    dragEnter = (e) => {
        if (e.target.classList.contains('task-type--list')) {
            e.target.classList.add('hovered');
        }
    }

    dragLeave = (e) => {
        const hovered = document.querySelector('.hovered');
        if (hovered) {
            hovered.classList.remove('hovered');
        }
    }

    dragDrop = (e) => {
        const currentTask = document.querySelector('.hide');
        const { target } = e;
        if (e.target.classList.contains('task-type--list')) {
            // e.target.insertBefore(currentTask, e.target.children[this.selectedNodePosition]);
            // e.target.append(currentTask);
            const newObj = {
                id: this.state[target.id].length,
                value:currentTask.childNodes[0].value
            }
            // this.state[target.id].push({
            //     id:  this.state[target.id].length,
            //     value: currentTask.childNodes[0].value,
            // });
            this.state[target.id].splice(this.selectedNodePosition, 0, newObj);
            this.state[this.currentList].forEach((item, i) => {
                if (+item.id === +currentTask.id) {
                    this.state[this.currentList].splice(i, 1);
                }
            })
            this.state[this.currentList].forEach((item, i) => {
                item.id = i;
            })
        }
        this.setState();
    }
}