const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', async (req, res) => 
res.render('login_signup')
);

router.get('/', async (req, res) =>
res.render('homepage')
)

router.get('/logout', async (req, res) =>
res.render('homepage')
);

module.exports = router