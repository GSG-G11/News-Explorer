function fetch(url, callbackOnSuccess, callbackOnFail, callbackOnServerError) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                callbackOnSuccess(data);
            } else if (xhr.status === 404) {
                callbackOnFail();
            } else if (xhr.status <= 500) {
                callbackOnServerError();
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}