unsigned long long square(unsigned short s) {
  if (s == 0 || s > 64) return 0;
  return 1ull << (s - 1);
}

unsigned long long total(void) {
  unsigned long long int i = 1;
  i <<= 63;
  return ~i + i;
}

