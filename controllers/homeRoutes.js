const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//Display blogs on homepage if logged in
router.get('/', async (req, res) => {
    try {
        const dataBlog = await Blog.findAll({
            include: {
                model: User,
                attributes: ['name']
            }
        })
        const blogs = dataBlog.map(blog=>blog.get({plain:true}))
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/blogs');
        return;
    }
    res.render('login');
});

//Find a blog by its id number
router.get('blogs/:id', async (req, res) => {
    try{
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                 model: User,
                 attributes: ['name']
                }
            ]
        });

        if (!blogData) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }
        
        const blog = blogData.get({ plain:true });
        res.render('blogid', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Redirect to create new blog post if logged in
router.get('/create', withAuth, (req, res) => {
    res.render('create', {logged_in: req.session.logged_in})
});

//Redirect to signup page
router.get('/signup', async (req, res) =>
res.render('signup')
);

//Display all blogs posted by user
router.get('/blogs', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        res.render('newblogs', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update blog post by id
router.get('/update/:id', async(req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include:{
                model: User,
                attributes: ['name']
            }
        })
        const blog = blogData.get({ plain: true })
        res.render('update', {
            ...blog,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router