from collections import defaultdict

class School(object):
    def __init__(self):
        self._students_by_grade = defaultdict(list)

    def add_student(self, name, grade):
        self._students_by_grade[grade].append(name)

    def roster(self):
        return [
            name
            for grade in sorted(self._students_by_grade)
            for name in self.grade(grade)
        ]

    def grade(self, grade_number):
        return sorted(self._students_by_grade[grade_number])
