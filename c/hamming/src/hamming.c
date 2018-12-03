int compute(char s[], char t[]) {
  int i, h;

  // Check for NULL pointers
  if (!s || !t)
    return -1;
  
  for (i = 0, h = 0; s[i] != '\0' && t[i] != '\0'; i++) {
    if (s[i] != t[i])
      h++;
  }

  // Return h unless input strings are of different size
  return (s[i] != t[i]) ? -1 : h;
}
