#ifndef BRACKET_PUSH_H
#define BRACKET_PUSH_H
#include <stdbool.h>
#include <ctype.h>
#define MAX_DEPTH 256
#define ERROR -1
#define IS_OPENING(c) (c == '(' || c == '{' || c == '[')
#define IS_CLOSING(c) (c == ')' || c == '}' || c == ']')
#define IS_MATCHING(o, c) ((o == '(' && c == ')') || (o == '{' && c == '}') || (o == '[' && c == ']'))
bool is_paired(const char *);
#endif
