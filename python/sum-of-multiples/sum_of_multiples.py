def sum_of_multiples(limit, factors):
    multiples = set()
    for f in factors:
        multiples.update(range(f, limit, f))
    return sum(multiples)

