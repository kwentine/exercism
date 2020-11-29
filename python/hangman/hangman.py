# Game status categories
# Change the values as you see fit
STATUS_WIN = "win"
STATUS_LOSE = "lose"
STATUS_ONGOING = "ongoing"


class Hangman:
    def __init__(self, word: str):
        self.remaining_guesses = 9
        self.status = STATUS_ONGOING
        assert word.isalpha(), "ASCII characters only"
        self.word = word
        self.mask = ["_" for _ in word]

    def guess(self, char):
        if self.get_status() != STATUS_ONGOING:
            raise ValueError("The game is over")
        found = False
        for i, c in enumerate(self.word):
            if c == char and self.mask[i] == '_':
                self.mask[i] = c
                found = True
        if not found:
            self.remaining_guesses -= 1

    def get_masked_word(self):
        return "".join(self.mask)

    def get_status(self):
        if "_" not in self.mask:
            return STATUS_WIN
        if self.remaining_guesses < 0:
            return STATUS_LOSE
        return STATUS_ONGOING
