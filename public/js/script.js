function sendRequest(url, method, body, headers) {
    return fetch(url, {
        method: method,
        headers: headers || {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
}