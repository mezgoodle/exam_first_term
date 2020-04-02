"use strict";

const mult = {
    h: 3600,
    m: 60,
    s: 1,
};

const fromStringtoSeconds = (timeInput) => {
    let timeInSeconds = 0;
    const temp = timeInput.split(" ");
    // console.log(temp);
    temp.forEach((element) => {
        const v = parseFloat(element, 10);
        const lastElement = element.slice(-1);
        timeInSeconds += v * mult[lastElement.toString()];
    });
    return timeInSeconds;
};

class Timer{
    constructor(){
        this.events = new Map();
    }

    schedule(timeInput, callback) {
        const time = fromStringtoSeconds(timeInput);
        const result = setTimeout(callback, time * 1000);
        const array = this.events.get(callback);
        if (array) {
            array.push(result);
        }
        else {
            this.events.set(callback, [result]);
        }
    }

    remove(callback) {
        const result = this.events.get(callback);
        result.forEach((element) => {
            clearTimeout(element);
        });
    }
    
}

// Calback
const fn = () => {
    /* eslint no-console: "error" */
    
    // custom console
    Console.log("Callback from timer");
  };

// Usage
const timer = new Timer();

// timer.schedule('1h 18s', fn);
// timer.schedule('5m', fn);
timer.schedule("5s", fn);
timer.schedule("5.0s", fn);
timer.remove(fn);
