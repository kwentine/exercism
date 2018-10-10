from functools import wraps


def ensure_open(func):
    @wraps(func)
    def wrapped(instance, *args, **kwargs):
        if not instance._is_open:
            raise ValueError(f'Operation `{func.__name__}` not allowed on close account.')
        return func(instance, *args, **kwargs)
    return wrapped


class BankAccount(object):

    balance = None
    _is_open = False

    def __init__(self):
        pass

    @ensure_open
    def get_balance(self):
        return self.balance

    def open(self):
        self._is_open = True
        self.balance = 0

    @ensure_open
    def deposit(self, amount):
        self.balance += amount

    @ensure_open
    def withdraw(self, amount):
        self.balance -= amount

    def close(self):
        self._is_open = False
