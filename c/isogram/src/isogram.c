#include <stdbool.h>
#include <stdlib.h>
#include <ctype.h>
#define LOWER_A 'a'
#define UPPER_A 'A'
#define ALPHABET_LENGTH 26
/* is_isogram: check wether a phrase has no repeating letter

   Letters are considered case-insensitively. 
   It is assumed that letters a-z (resp A-Z) are represented
   as consecutive integers in the machine's character set, as
   is the case for ASCII.
*/
bool is_isogram(const char phrase[]) {
  int i;
  char c;
  int seen[ALPHABET_LENGTH] = {0};

  if (phrase == NULL)
    return 0;
  
  for (i = 0; (c = phrase[i]) != '\0'; i++)
    if ((islower(c) && seen[c - LOWER_A]++) || (isupper(c) && seen[c - UPPER_A]++))
      return 0;

  return 1;
}
