#include "gigasecond.h"
static time_t gigasecond = 1000000000;
time_t gigasecond_after(time_t time) {
  return time + gigasecond;
}
