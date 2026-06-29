export function delay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomDelay(min = 300, max = 900): Promise<void> {
  return delay(Math.floor(Math.random() * (max - min + 1)) + min);
}
