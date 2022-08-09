import { LightningElement, track } from 'lwc';

export default class ToDoManager extends LightningElement {
    @track
    time = "Static Time";
    @track
    greeting = "Static Greeting";
    @track
    todos = [];

    connectedCallback() {
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 1000);
    }
    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)}:${this.getDoubleDigit(sec)} ${this.getMidDay(hour)}`;
        this.setGreeting(hour);
    }
    getHour(hour) {
        return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    }
    getMidDay(hour) {
        return hour < 12 ? "AM" : "PM";
    }
    getDoubleDigit(digit) {
        return digit < 10 ? "0" + digit : digit;
    }
    setGreeting(hour) {
        if (hour < 12) {
            this.greeting = "Good Morning";
        } else if (hour < 18) {
            this.greeting = "Good Afternoon";
        } else {
            this.greeting = "Good Evening";
        }
    }
    addToDohandler() {
        const inputValue = this.template.querySelector('lightning-input');
        const todo = {
            todoId: this.todos.length,
            todoName: inputValue.value,
            done: false,
            todoDate: new Date()
        }
        this.todos.push(todo);
        inputValue.value = "";
    }

}