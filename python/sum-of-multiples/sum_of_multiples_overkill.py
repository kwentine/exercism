
def sum_of_multiples_overkill(limit, factors):

    if not factors:
        return 0

    if factors[0] == 0:
        factors = factors[1:]

    if factors[0] == 1:
        return sum(range(limit))
    
    multiples = set()
    
    while(factors and factors[0] < limit):

        lowest, *factors = factors

        # If we have a multiple of a previous factor, we can continue
        # to the next pass
        #
        # Here I assume that checking membership in the set of
        # previously generated multiples will be more efficient than
        # checking divisibility by any of already processed factors.
        if lowest in multiples:
            continue
        
        for m in range(lowest, limit, lowest):
            multiples.add(m)

    return sum(multiples)
