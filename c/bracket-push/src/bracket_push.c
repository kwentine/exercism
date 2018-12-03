#include "bracket_push.h"
#include <stdio.h>
static char stack[MAX_DEPTH];
static int top = -1;


static int push(char c) {
  // maximum nesting depth reached
  // -1 signals an error to the caller
  if (top == MAX_DEPTH)
    return ERROR;
  stack[++top] = c;
  return top;
}

static int pop() {
  return (top == -1) ? ERROR : stack[top--];
}

bool is_paired(const char *s) {
  char c, o;
  
  if (s == 0)
    return false;

  top = -1;
  while((c = *s++) != '\0') {
    if (IS_OPENING(c) && (push(c) == -1))
      return false;
    else if (IS_CLOSING(c)) {
      o = pop();
      if (!IS_MATCHING(o, c))
        return false;
    }
  }
  return top == -1;
}
