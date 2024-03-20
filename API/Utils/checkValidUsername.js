

/**
 * rule: 
 * 1. username must be at least 6 characters
 * 2. username must only contain letters, numbers and _
 * 3. username must not start with _
 * 4. username must not start with number
 * return true if username is valid
 */
export default async function checkValidUsername(username) {
    if (username.length < 6) {
        throw new Error("Username must be at least 6 characters");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error("Username must only contain letters, numbers and _");
    }
    if (username[0] === "_") {
        throw new Error("Username must not start with _");
    }
    if (/[0-9]/.test(username[0])) {
        throw new Error("Username must not start with number");
    }
}