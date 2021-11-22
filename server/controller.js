const path = require("path");

module.exports = {
    home: (req, res) => res.status(200).sendFile(paht.join(__dirname, "../public/index.html"))
}