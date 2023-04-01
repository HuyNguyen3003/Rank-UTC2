const Queue = require('bull');
const LocalStorage = require('node-localstorage').LocalStorage;


const myQueue = new Queue('my queue');
const localStorage = new LocalStorage('./scratch');

setInterval(() => {

    try {
        const job =  myQueue.add(localStorage.setItem('time', new Date()), { delay: 0 });
        console.log('Job has been added to the queue!');
    } catch (err) {
        console.error(err);
    }
}, 5000);

myQueue.process(() => {
   
});
