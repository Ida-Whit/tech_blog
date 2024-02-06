const router = require('express').Router();
const { User } = require('../../models');

//Create New User
router.post('/', async (req, res) => {
    try{
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

//Login
router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({ where: {email: req.body.email } });

        if(!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password.' });
            return;
        } else {
            const validPassword = await userData.checkPassword(req.body.password);
            if(!validPassword) {
                res
                    .status(400)
                    .json({ message: 'Incorrect email or password.' });
                return;
        } else {
            req.session.save(() => {
            res.redirect('/')
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            });
        }
    }
} catch (err) {
    res.status(500).json(err);
    }
});

//Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;