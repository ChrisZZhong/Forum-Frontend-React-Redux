export const verifyEmailRequest = () => ({
    type: 'VERIFY_EMAIL_REQUEST',
});
export const verifyEmailSuccess = () => ({
    type: 'VERIFY_EMAIL_SUCCESS',
});
export const verifyEmailFailure = (error) => ({
    type: 'VERIFY_EMAIL_FAILURE',
    payload: error,
});
export const changeEmailSuccess = () => {
    return {
        type: 'CHANGE_EMAIL',
    };
}