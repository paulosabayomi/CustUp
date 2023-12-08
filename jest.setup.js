import crypto from "crypto";

Object.defineProperty(globalThis, 'crypto', {
    value: {
        randomUUID: (n = 10) => crypto.randomBytes(n)
    }
});
