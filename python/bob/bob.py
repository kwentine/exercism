def hey(phrase):
    phrase = phrase.strip()
    if not phrase:
        return 'Fine. Be that way!'
    if is_question(phrase):
        return answer_question(phrase)
    return answer_assertion(phrase) 

def answer_question(phrase):
    if is_yelling(phrase):
        return "Calm down, I know what I'm doing!"
    return "Sure."

def answer_assertion(phrase):
    if is_yelling(phrase):
        return 'Whoa, chill out!'
    return 'Whatever.'

def is_question(phrase):
    return phrase.endswith('?')

def is_yelling(phrase):
    return phrase.isupper()
