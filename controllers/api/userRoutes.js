const router = require('express').Router();
const { User } = require('../../models');

//Create New User
router.post('/signup', async (req, res) => {
    try{
        const userData = await User.create(req.body);
    
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.save();
            res.status(200).json(userData);
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
        } const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.save(() => {
                res.redirect('/')
            });
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