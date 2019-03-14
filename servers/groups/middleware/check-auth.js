

const contentTypeHeader = "Content-Type"
const contentTypeText = "text/plain"
const contentTypeJSON = "application/json"

module.exports = (req, res, next) => {
    var currUser = req.get("X-User");
    if (currUser) {
        return JSON.parse(currUser)
    }
    writeResponseText(res, 401, "User Not Authenticated")
    return null
}

function writeResponseText(res, statusCode, statusText) {
    res.setHeader(contentTypeHeader, contentTypeText);
    res.status(statusCode).send(statusText);
}
