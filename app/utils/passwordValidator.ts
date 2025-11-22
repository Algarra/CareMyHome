export const validatePasswordCapitalLetteres = (password: string) => /[A-Z]/.test(password);
export const validatePasswordLetteres = (password: string) => /[a-z]/.test(password);
export const validatePasswordNumbers = (password: string) => /[0-9]/.test(password);
export const validatePasswordSpecialCharacter = (password: string) => /[^A-Za-z0-9]/.test(password);
export const validatePasswordLength = (password: string) => password.length >= 10;

export const validatePassword = (password: string) => {
	return (
		validatePasswordCapitalLetteres(password) &&
		validatePasswordLetteres(password) &&
		validatePasswordNumbers(password) &&
		validatePasswordSpecialCharacter(password) &&
		validatePasswordLength(password)
	);
};
