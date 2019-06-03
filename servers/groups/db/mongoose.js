var mongoose = require('mongoose');

// how mongoose handles promises
mongoose.Promise = global.Promise;

async function connect() {   //{localhost = groupdb}
    const mongoUrl ="mongodb://groupdb:27017/gpdb";
    return mongoose.connect(mongoUrl, { useNewUrlParser: true})
}

module.exports.mongoose = mongoose;
module.exports.connect = connect;