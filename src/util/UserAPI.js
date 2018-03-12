// clientSide Post
// params = JSON.stringify({ "username": "timk", "password": "password" })
// options = {
//     method: 'POST',
//     body: params,
//     credentials: 'same-origin',
//     headers: {

//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// }
// fetch("/api/users", options).then(res => res.json()).then(data => console.log(data))

export const createUser = (username, password) => {
    const body = JSON.stringify({
        username,
        password
    });
    console.log("CREATE USER API", username, password, body)
    const method = "POST";
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
    return fetch('/api/users/', {
        method,
        body,
        credentials: 'same-origin',
        headers
    }).then((res) => res.json())

}

export const checkUserName = (username) => {
    const method = "GET";
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
    return fetch(`/api/users/${username}`, {
        method,
        headers
    }).then((res) => res.json())
}

export const login = (username, password) => {
    const body = JSON.stringify({
        password
    });
    const method = "POST";
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
    return fetch(`/api/users/${username}/session`, {
        method,
        body,
        credentials: 'same-origin',
        headers
    }).then((res) => res.json())
}

export const logout = () => {};