//instead of using a for inside into another for, use a lookup tables
function studentWhoseTeacherIsHighestPaidMemoizedNewApproach(students, teachers){
    const maxStudentTeacherCombo = {
        student: students[0],
        teacherSalary: teachers[0].salary
    }
    const teacherSalaryLookup = {}
    for(const teacher of teachers){
        teacherSalaryLookup[teacher.name] = teacher.salary;
    }
    for(const student of students){
        const teacherSalary = teacherSalaryLookup[student.teacher];
        if(teacherSalary > maxStudentTeacherCombo.teacherSalary){
            maxStudentTeacherCombo.student = student;
            maxStudentTeacherCombo.teacherSalary = teacherSalary;
        }
    }
    return maxStudentTeacherCombo.student;
}