// Letters 'a' through 'z' have consecutive characters codes.
const LOWER_A = 'a'.charCodeAt(0);
const NUM_CHARS = 26;

class Cipher {

  constructor(key) {
    if (key === undefined) {
      this.key = randomKey();
    } else if (typeof key === 'string' && (/^[a-z]+$/.test(key))) {
      this.key = key
    } else {
      throw new Error('Bad key');
    }
  }

  encode(message) {
    return message.split('').map((c, i) => shift(c, getOffset(this.key.charAt(i % this.key.length)))).join('')
  }

  decode(message) {
    return message.split('').map((c, i) => shift(c, -getOffset(this.key.charAt(i % this.key.length)))).join('')
  }
}

/**
 * Shift a lowercase letter in the alphabet by a relative number of places
 *
 * @param {string} char - The one character string representing the letter
 * @param {number} n - The (relative) integer of places to shift
 * @return {string} - The shifted letter
 */
 function shift(char, n) {
  return charAtOffset(getOffset(char) + n)
}


/**
 * Get the offset of a letter counting from the beginning of the alphabet
 *
 * @param {string} char - One character string
 * @return {number} - The offset (between 0 and 25) from the letter 'a'
 */
function getOffset(char) {
  return char.charCodeAt(0) - LOWER_A
}

/**
 * Finds the character at a given relative offset from the letter 'a' in the alphabet
 *
 * @param {number} offset - Relative offset
 * @return {string}
 */
function charAtOffset(offset) {
  ((offset = offset % NUM_CHARS) < 0) && (offset += NUM_CHARS);
  return String.fromCharCode(LOWER_A + offset)
}

/**
 * Generate a string of random characters taken in the range [a-z]
 *
 * @param {number} length
 * @return {string}
 */

function randomKey(length=100) {
  return Array.from({length}, () => charAtOffset(Math.floor(Math.random() * NUM_CHARS))).join('')
}

export {Cipher, shift}