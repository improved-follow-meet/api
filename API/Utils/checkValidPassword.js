export default async function checkValidPassword(password) {
	if (password.length < 6) {
		throw new Error("Password must be at least 6 characters");
	}

	if (!/^[a-zA-Z0-9_]+$/.test(password)) {
		throw new Error(
			"Password must contain only letters, numbers and underscores"
		);
	}

	return true;
}
