export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('auth_info');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('auth_info', serializedState)
    } catch {

    }
}

export const getSessionId = () => {
    let session_id;
    if (localStorage.getItem('auth_info')) {
        if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser) {
            if (JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse) {
                session_id = JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse.session_id
                // username = JSON.parse(localStorage.getItem('auth_info')).authenticateUser.authResponse.username

            }
        }
    }
    return session_id
}