function fetch(url, callbackOnSuccess, callbackOnFail) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 200:
                    let data = JSON.parse(xhr.responseText);
                    callbackOnSuccess(data);
                    break;
                case 404:
                    callbackOnFail();
                    break;
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}