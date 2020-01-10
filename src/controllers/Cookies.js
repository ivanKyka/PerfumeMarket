// возвращает cookie с именем name, если есть, если нет, то undefined
function getAuthData(name) {
    return window.localStorage.getItem(name);
}

// options - объект с свойствами cookie (expires, path, domain, secure)
function setAuthData(name, value, options) {
    window.localStorage.setItem(name, value);
}

function deleteAuthData(name) {
    window.localStorage.removeItem(name);
}

export {
    setAuthData,
    getAuthData,
    deleteAuthData
}