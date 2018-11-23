def saddle_points(matrix):
    check_matrix_shape(matrix)
    row_maxs = row_extrema(matrix, max)
    col_mins = {(j, i) for (i, j) in row_extrema(transpose(matrix), min)}
    return row_maxs & col_mins

def row_extrema(matrix, min_or_max=min):
    """Return the set of coordinates of row-wise extrema
    
    The kind of extrema is specified as a function list -> int,
    and in our case will be either min or max.
    """
    extremal_values = [min_or_max(row) for row in matrix]
    extremal_points = set()
    for i, row in enumerate(matrix):
        for j, val in enumerate(row):
            if val == extremal_values[i]:
                extremal_points.add((i, j))
    return extremal_points

def transpose(matrix):
    """Return the transpose of given matrix"""
    return [list(t) for t in zip(*matrix)]

def check_matrix_shape(matrix):
    if len({len(r) for r in matrix}) > 1:
        raise ValueError("All rows must have the same length.")
