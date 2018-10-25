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
        front_row, back_row = self._validate_diagram(diagram)
        plant_lots = self._get_plant_lots(front_row, back_row)
        self.student_lots = dict(zip(self.students, plant_lots))

    def plants(self, student):
        return [self.plant_species[p] for p in list(self.student_lots[student])]

    def _validate_diagram(self, diagram):
        """Check that the diagram is valid

        Raise ValueError if the diagram is invalid.
        Return (front_row, back_row) pair otherwise.
        """
        allowed_species = ''.join(self.plant_species)
        spec = f'^[{allowed_species}]+\n[{allowed_species}]+$'
        if not re.match(spec, diagram):
            raise ValueError('Invalid diagram.')
        return tuple(diagram.split('\n'))

    def _get_plant_lots(self, front_row, back_row):
        """Return a list of strings representing consecutive student lots
        
        This is done in three steps:
          - generate pairs of consecutive letters for each row
          - zip togeter the corresponding tuples
          - concatenate
        """
        i1, i2 = iter(front_row), iter(back_row)
        return [a + b + c + d for (a, b), (c, d) in zip(zip(i1, i1), zip(i2, i2))]
        
        
