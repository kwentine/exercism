

class Allergies(object):

    ITEMS = {
        'eggs': 1,
        'peanuts': 2,
        'shellfish': 4,
        'strawberries': 8,
        'tomatoes': 16,
        'chocolate': 32,
        'pollen': 64,
        'cats': 128
    }
    
    def __init__(self, score):
        assert isinstance(score, int) and score >= 0, "Allergy score must be a positive integer."
        self.score = score

    def is_allergic_to(self, item):
        value = self.ITEMS.get(item, 0)
        return bool(self.score & value)
    

    @property
    def lst(self):
        return [item for (item, value) in self.ITEMS.items() if self.is_allergic_to(item)]
