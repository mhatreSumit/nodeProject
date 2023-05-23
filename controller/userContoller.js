const userService = require("../service/userService");

class userContoller {
    async add(req, res) {
        const responseResult = {}
        try {
            const userData = req.body
            if (req.body.email) { userData.email = req.body.email.toLowerCase(); }
            if (req.body.name) { userData.name = req.body.name; }
            if (req.body.mobile) { userData.mobile = req.body.mobile; }
            if (req.body.gender) { userData.gender = req.body.gender; }

            const userAdd = await userService.add(userData);

            if (userAdd) {
                responseResult.success = true;
                responseResult.result = userAdd;
                responseResult.message = `please copy your user id ${userAdd._id}, it is necessory for updating your information.`;

                return res.status(201).send(responseResult)
            }
            else {
                console.log('user not added')
                responseResult.success = false
                responseResult.message = 'user not added'
                return res.status(200).send(responseResult)
            }

        } catch (error) {
            console.log('error in userController/add', error)
            responseResult.success = false
            responseResult.message = 'user not added'
            responseResult.error = error
            return res.status(400).send(responseResult)
        }

    }

    async list(req, res) {
        try {
            const responseResult = {}
            let userList = await userService.find({});
            // console.log("userList =>", userList);
            if (userList.length > 0) {
                responseResult.success = true
                responseResult.message = 'users list'
                responseResult.users = userList
                return res.status(200).send(responseResult)
            }
            else {
                responseResult.success = false
                responseResult.message = 'no user added'
                return res.status(200).send(responseResult)
            }
        } catch (error) {
            console.log('error in userController/list', error)
            responseResult.success = false
            responseResult.message = 'failed to find user data'
            responseResult.error = error
            return res.status(400).send(responseResult)
        }
    }

    async update(req, res) {
        try {
            const responseResult = {}

            const userData = req.body;
            if (req.params.id == undefined) {
                responseResult.success = false
                responseResult.message = 'please enter your user id'
                return res.status(200).send(responseResult)
            } else { userData.uid = req.params.id }

            if (req.body.email) { userData.email = req.body.email.toLowerCase(); }
            if (req.body.name) { userData.name = req.body.name; }
            if (req.body.mobile) { userData.mobile = req.body.mobile; }
            if (req.body.gender) { userData.gender = req.body.gender; }

            const userUpdate = await userService.update(userData);

            if (userUpdate) {
                responseResult.success = true
                responseResult.message = 'user data updated successfully'
                return res.status(200).send(responseResult)
            }
            else {
                responseResult.success = false
                responseResult.message = 'error while updating user data'
                return res.status(200).send(responseResult)
            }
        } catch (error) {
            console.log('error in userController/list', error)
            responseResult.success = false
            responseResult.message = 'failed to update user data'
            responseResult.error = error
            return res.status(400).send(responseResult)
        }
    }

}
module.exports = new userContoller()