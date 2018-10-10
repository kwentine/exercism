import re

class Garden(object):

    plant_species = {
        'V': 'Violets',
        'R': 'Radishes',
        'C': 'Clover',
        'G': 'Grass'
    }

    students = (
        'Alice', 'Bob', 'Charlie', 'David',
        'Eve', 'Fred', 'Ginny', 'Harriet',
        'Ileana', 'Joseph', 'Kincaid', 'Larry'
    )

    
    def __init__(self, diagram, students=None):

        if students:
            self.students =  sorted(students)

        front_row, back_row = diagram.split('\n')

        # Check that the diagram is valid
        allowed_species = ''.join(self.plant_species)
        spec = r'^[%s]{%s}$' % (allowed_species, len(self.students) * 2)
        if not re.match(spec, front_row) and re.match(spec, back_row):
            raise ValueError('Invalid diagram.')
        
        # Form a list of strings representing student lots:
        #   - generate pairs of consecutive letters for each row
        #   - zip togeter the corresponding tuples
        #   - concatenate
        i1, i2 = iter(front_row), iter(back_row)
        plant_lots = [a + b + c + d for (a, b), (c, d) in zip(zip(i1, i1), zip(i2, i2))]

        self.student_lots = dict(zip(self.students, plant_lots))

    def plants(self, student):
        return [self.plant_species[p] for p in list(self.student_lots[student])]
