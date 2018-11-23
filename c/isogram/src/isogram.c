#include <stdbool.h>
#include <stdlib.h>
#define LOWER_A 'a'
#define UPPER_A 'A'
#define LOWER_Z 'z'
#define UPPER_Z 'Z'
#define ALPHABET_LENGTH 26
/* is_isogram: check wether a phrase has no repeating letter

   Letters are considered case-insensitively. 
   It is assumed that letters a-z (resp A-Z) are represented
   as consecutive integers in the machine's character set, as
   is the case for ASCII.
*/
bool is_isogram(const char phrase[]) {
  int i = 0;
  char c;
  int seen[ALPHABET_LENGTH];

  if (phrase == NULL)
    return 0;
  
  // Initialize the array of characters seen so far
  for (i = 0; i < ALPHABET_LENGTH; seen[i++] = 0)
    ;

  i = 0;
  while((c = phrase[i++]))
    if (c >= LOWER_A && c <= LOWER_Z && seen[c - LOWER_A]++)
      return 0;
    else if (c >= UPPER_A && c <= UPPER_Z && seen[c - UPPER_A]++)
      return 0;
  return 1;
}
