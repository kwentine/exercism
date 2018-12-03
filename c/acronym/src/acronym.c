#include <ctype.h>
#include <stdlib.h>
#define ACR_LEN 8

void *make_space(void *ptr, size_t size) {
  return ptr == NULL ? malloc(size) : realloc(ptr, size);
}

char *abbreviate(char *phrase) {
  // Exit early if we have a NULL pointer or an empty string.
  if (!(phrase && *phrase)) return NULL;
  char *ptr = phrase;
  // Pointer to allocated space to store the acronym
  char *acr = NULL;
  // Invariants:
  // - max_idx: index of the last available character slot
  // - idx: index of the next free character slot.
  // - when exiting the loop, idx is at most equal to max_idx, leaving an
  //   empty slot to terminate the acronym with a null byte.
  size_t idx = 0, max_idx = 0;
  int capture_next = 1;
  char c;
  
  // Phrase is not finished and at least one slot left 
  while((c = *ptr++)) {
    if (capture_next && isalpha(c)) {
      if (idx == max_idx) {
        max_idx += ACR_LEN;
        if ((acr = make_space(acr, (max_idx + 1) * sizeof(char))) == NULL) break; 
      }
      acr[idx++] = toupper(c);
      capture_next = 0;
    }
    if (!capture_next && (isspace(c) || c == '-')){
      capture_next = 1;
    }
  }
  acr[idx] = '\0';
  return *acr ? acr : NULL;
}
