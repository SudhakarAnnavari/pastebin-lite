import { headers } from "next/headers";

export async function nowMs(): Promise<number> {
  if (process.env.TEST_MODE === "1") {
    const h = await headers();           // await the Promise
    const testNow = h.get("x-test-now-ms");
    if (testNow) return parseInt(testNow, 10);
  }
  return Date.now();
}


//time.js