import { customAlphabet } from "nanoid";

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";

export const generateSlug = customAlphabet(ALPHABET, 6);
