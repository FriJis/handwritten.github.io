window.randArrayObject = (arr) => {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}