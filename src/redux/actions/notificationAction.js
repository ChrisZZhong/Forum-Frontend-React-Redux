export const openNotification = (data) => ({
    type: 'OPEN',
    payload: data
});
export const closeNotification = () => ({
    type: 'CLOSE',
});