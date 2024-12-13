const User = require("../model/user");

exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log('exist', user);
            res.status(200).json({ user: null, message: 'user exist' });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            });
            const createdUser = await newUser.save()
            req.logIn(createdUser, function (err) {
                if (err) {
                    console.log(err);
                }
                // console.log(req.session);
                req.session.save()
                return res.status(200).json({ user: createdUser, message: 'user created' });
            });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.loginuser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user.password == req.body.password) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    // console.log(req.session);
                    req.session.save()
                    return res.status(200).json({ user: user, message: 'login succesfull' });
                });
            }
            else
                return res.status(200).json({ user: null, message: 'password incorrect' });
        }
        else {
            return res.status(200).json({ user: null, message: 'sign-up first' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};