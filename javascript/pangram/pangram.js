const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(sentence) {
  // We are only interested in letters, case-insensitively.
  const letters = sentence.toLowerCase().replace(/[^a-z]/g, '');

  // The following would work without the call to .replace() above,
  // and I wonder which would be more efficient in
  // the case of a long string with many non-letter characters
  const checklist = new Set([...ALPHABET]);
  for (let c of letters) {
    checklist.delete(c);
  }
  return checklist.size === 0
}