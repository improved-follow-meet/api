export default async function checkValidEmail(email) {
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
        throw new Error("Email is invalid");
    }
    return true;
}