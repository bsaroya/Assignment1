class Student {
  constructor(id, name, department, semester, enrolledCourses = [], completedCourses = []) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.semester = semester;
    this.enrolledCourses = enrolledCourses;
    this.completedCourses = completedCourses;
  }

  calculateAverageGrade() {
    if (this.completedCourses.length === 0) return 0;
    const totalGrades = this.completedCourses.reduce((sum, course) => sum + course.grade, 0);
    return totalGrades / this.completedCourses.length;
  }
}

module.exports = Student;
