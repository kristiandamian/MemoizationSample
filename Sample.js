//best academic definition
//https://addyosmani.com/blog/faster-javascript-memoization/
//real good sample
//https://medium.com/@kevinkoehler/practical-memoization-in-javascript-20a02887314e
//best implementations
//https://medium.com/dottech/comprendiendo-la-memoization-en-javascript-typescript-83dd851b54f4

const memoize = fn => {
    const cache = {}; // 1
    return (...args) => { // 2
        const stringifiedArgs = JSON.stringify(args); // 3
        const result = (cache[stringifiedArgs] =
            typeof cache[stringifiedArgs] === 'undefined'
                ? fn(...args)
                : cache[stringifiedArgs]); // 4
        return result; // 5
    };
};

const students = [{ name: "Fred", teacher: "Steve" }, { name: "Chris", teacher: "Bob" }, { name: "Juan", teacher: "Oscar" }, { name: "Maria", teacher: "Carlos" }]
const teachers = [{ name: "Steve", salary: 50000 }, { name: "Bob", salary: 60000 }, { name: "Oscar", salary: 70000 }, { name: "Carlos", salary: 80000 }]

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

const getElements = selector => {
    let r = document.querySelectorAll(selector || '0'), length = r.length;
    return (length == 1) ? r[0] : r;
};

const measureTime = (cb, ...args) => {
    const t0 = performance.now();
    var result = cb(...args);
    console.log(result)
    const t1 = performance.now();
    console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
};

const getElementsMemorized = memoize(getElements); // Decorator Pattern
const studentWhoseTeacherIsHighestPaidMemorized = memoize(studentWhoseTeacherIsHighestPaid); // Decorator Pattern

for (let i = 10; i > 0; i--) {
    measureTime(getElementsMemorized, "img");
}

for (let i = 10; i > 0; i--) {
    measureTime(studentWhoseTeacherIsHighestPaidMemorized, students, teachers);
}