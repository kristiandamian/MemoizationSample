//custom Memonize implementation
const memoize = fn => {
    const cache = {}; 
    return (...args) => { 
        const stringifiedArgs = JSON.stringify(args); 
        const result = (cache[stringifiedArgs] =
            typeof cache[stringifiedArgs] === 'undefined'
                ? fn(...args)
                : cache[stringifiedArgs]); 
        return result; 
    };
};

//the data
const students = [{ name: "Fred", teacher: "Steve" }, { name: "Chris", teacher: "Bob" }, { name: "Juan", teacher: "Oscar" }, { name: "Maria", teacher: "Carlos" }]
const teachers = [{ name: "Steve", salary: 50000 }, { name: "Bob", salary: 60000 }, { name: "Oscar", salary: 70000 }, { name: "Carlos", salary: 80000 }]

//find students with the richest teacher
const studentWhoseTeacherIsHighestPaid = (students, teachers) => {
    const maxStudentTeacherCombo = {
        student: students[0],
        teacher: teachers[0]
    }
    for (const student of students) {
        for (const teacher of teachers) {
            if (student.teacher === teacher.name && teacher.salary > maxStudentTeacherCombo.teacher.salary) {
                maxStudentTeacherCombo.student = student;
                maxStudentTeacherCombo.teacher = teacher;
            }
        }
    }
    return maxStudentTeacherCombo.student;
}

//get elements of current page
const getElements = selector => {
    let r = document.querySelectorAll(selector || '0'), length = r.length;
    return (length == 1) ? r[0] : r;
};

//mesure execution time of a function with N arguments
const measureTime = (cb, ...args) => {
    const t0 = performance.now();
    var result = cb(...args);
    console.log(result)
    const t1 = performance.now();
    addItem('Call the function took ' + (t1 - t0) + ' milliseconds.');
};

//declare memorized functions
const getElementsMemorized = memoize(getElements); // Decorator Pattern
const studentWhoseTeacherIsHighestPaidMemorized = memoize(studentWhoseTeacherIsHighestPaid); // Decorator Pattern

//add item into the main div
const addItem = (message) => {
    console.log(message);
    var target = document.querySelector('#main');
    var msg = document.createElement('div');
    msg.innerHTML = message;
    target.parentNode.insertBefore(msg, target);
};