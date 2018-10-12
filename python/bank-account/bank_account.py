import threading

lock = threading.Lock()


class BankAccount(object):

    balance = None
    _is_open = False

    def __init__(self):
        pass

    def get_balance(self):

        if not self._is_open:
            raise ValueError('Account is closed.')

        return self.balance

    def open(self):
        self._is_open = True
        self.balance = 0

    def __getattr__(self, name):
        if name not in ['deposit', 'withdraw']:
            return super().__getattr__(name)
        return _get_operation(self, name)

    def close(self):
        self._is_open = False

# TODO
# Direct access to the `balance` attribute makes precautions below useless
def _get_operation(self, name):

    def withdraw(self, amount):
        self.balance -= amount

    def deposit(self, amount):
        self.balance += amount

    operations = {'withdraw': withdraw, 'deposit': deposit}

    def op(amount):
        with lock:
            if not self._is_open:
                raise ValueError(
                    f'Operation `{name}`' 
                    'not allowed on close account.'
                )

            if amount < 0:
                raise ValueError('Amount cannot be positive')

            if name == 'withdraw':
                if self.balance < amount:
                    raise ValueError('Insufficient funds')

            operations[name](self, amount)

    return op


