module.exports = {
    termFormat: (string) => {
        let key = {
            "/": "'",
            "'": "/"
        }
        let splitStr = string.split("");
        let newStr = []
        for ( let i = 0; i < splitStr.length; i++) {
            if (key[splitStr[i]]) {
                newStr.push(key[splitStr[i]])
            } else {
                newStr.push(splitStr[i])
            }
        }
        return newStr.join("");
    }
}