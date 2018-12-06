// Okay, first try to write a naïve solution when everything goes well
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include "word_count.h"


int increment_count(char *, word_count_word_t *, int *);
void print_word_counts(word_count_word_t *);

int word_count(const char *input_text, word_count_word_t *words) {
  // Number of unique words encoutered
  int unique_words = 0;
  // Buffer to hold the current word being read from input text
  char word[MAX_WORD_LENGTH + 1];
  // Next free slot in the current word buffer
  int word_idx = 0;
  // The current input character
  char c;
  // Whether we are currently in a word 
  enum {OUT, IN} state = OUT;


  // Guard against NULL input pointer
  if (!input_text)
    return -3;

  // Clear target structure
  // Otherwise tests won't pass because of dirty state
  memset(words, 0, sizeof(word_count_word_t) * MAX_WORDS);
  
  while(1) {
    c = tolower(*input_text++);
    if (state == OUT) {
      if (c == '\0') break;
      if (!isalnum(c)) continue;
      // Now we are inside a new word
      state = IN;
      word_idx = 0;
    }
    if (state == IN) {
      // Character is a continuation of the current word
      if (isalnum(c) || (c == '\'' && isalnum(*input_text))) {
          // Make sure one extra slot is free for the null byte before writing
          if (word_idx == MAX_WORD_LENGTH) return EXCESSIVE_LENGTH_WORD;
          word[word_idx++] = c;
      }
      else {
        // End of word reached.
        // Terminate current word buffer and increment word counts.
        word[word_idx] = '\0';
        if (increment_count(word, words, &unique_words) == EXCESSIVE_NUMBER_OF_WORDS)
          return EXCESSIVE_NUMBER_OF_WORDS;
        if (c == '\0') break;
        state = OUT;        
      }        
    }
  }
   return unique_words;
}



int increment_count(char *word, word_count_word_t *words, int *unique_words) {
  // Increment the count for word, and update the count of unique words if needed.
  // Return the new count for word, or EXCESSIVE_LENGTH_WORD if we are out of space.
  int i;

  for (i = 0; i < MAX_WORDS; i++) {
    if (words[i].count == 0) {
      // We have a reached a free slot
      // Word has not been encountered yet
      words[i].count = 1;
      strcpy(words[i].text, word);
      (*unique_words)++;
      return 1;
    }
    else if (strcmp(words[i].text, word) == 0) {
      // Increment count for previously encountered word
      return ++words[i].count;
    }
  }
  // If we're at this point, we have no more room to store additional words.
  // Return an error value
  return EXCESSIVE_NUMBER_OF_WORDS;
}


// Used only for debugging
void print_word_counts(word_count_word_t *words) {
  int i;
  fprintf(stderr, "Word counts:");
  for (i = 0; i < MAX_WORDS; i++) {
    if (words[i].count == 0)
      break;
    fprintf(stderr, " '%s'=%d", words[i].text, words[i].count);
  }
  fprintf(stderr, "\n");
}
