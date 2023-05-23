const userModel = require('../model/userModel');
class UserService {

    /** Add user details using promise **/
    add(data) {
        return userModel.add(data);
    }

    find(data, sort, limit, skip) {
        return userModel.find(data, sort, limit, skip);
    }

    update(data) {
        return userModel.update(data);
    }
}

module.exports = new UserService();