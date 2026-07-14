import { readFileSync } from "node:fs";

export const value = readFileSync("forbidden.txt", "utf8");
