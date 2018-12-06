int compute(char left_str[], char right_str[]) {
  int i;
  int hamming_dist = 0;

  // Check for NULL pointers
  if (!left_str || !right_str)
    return -1;
  
  for (i = 0; left_str[i] != '\0' && right_str[i] != '\0'; i++) {
    if (left_str[i] != right_str[i])
      hamming_dist++;
  }

  // Return hamming distance, unless we haven't reached the end of
  // both input strings in which case it is an error.
  return (left_str[i] == '\0' && right_str[i] == '\0') ? hamming_dist : -1;
}
