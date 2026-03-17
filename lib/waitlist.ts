import { promises as fs } from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), ".waitlist.json");

export async function addToWaitlist(email: string): Promise<void> {
  let emails: string[] = [];
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    emails = JSON.parse(data);
  } catch {
    // File doesn't exist yet
  }

  if (emails.includes(email)) {
    return; // Already on the list, silently succeed
  }

  emails.push(email);
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(emails, null, 2));
}
