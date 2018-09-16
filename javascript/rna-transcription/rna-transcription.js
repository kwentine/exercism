const complements = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
}

const DNA = /^(A|T|G|C)*$/;

export function toRna(dna) {
    // Input validation
    if (!(typeof dna === 'string' && DNA.test(dna)))
        throw new Error('Invalid input DNA.');

    return Array.prototype.map.call(dna, n => complements[n]).join('');
}
