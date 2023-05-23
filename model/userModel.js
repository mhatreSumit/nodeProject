const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    }
);

const user = mongoose.model('users', userSchema);
class UserModel {
    add(data, callback) {
        let userData = new user(data);
        return new Promise((resolve, reject) => {
            userData.save().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }


    find(data, sort, limit, skip) {
        if (limit != undefined) {
            return new Promise((resolve, reject) => {
                user.find(data).sort(sort)
                    .limit(parseInt(limit, 10))
                    .skip(parseInt(skip, 10))
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.log("Error in fetching users list:" + error);
                    })
            })
        } else {
            return new Promise((resolve, reject) => {
                user.find(data).sort(sort)
                    .then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    })
            })
        }
    }

    update(data, callback) {
        let UserId = data.uid;
        delete data.uid
        //console.log(data); return ;
        return new Promise((resolve, reject) => {
            user.updateOne({ '_id': UserId }, data).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        })
    }

}

module.exports = new UserModel();