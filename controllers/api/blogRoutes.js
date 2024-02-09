const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth')

//Create new blog post
router.post('/dashboard', withAuth, async (req, res) => {
    try{
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Update blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.body.id,
                user_id: req.body.user_id
            }
        })
        if(!blogData) {
            res.status(404).json({ error: 'Blog post not found' }) 
            return;
        }            
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        if (!blogData) {
            res.status(404).json({ message: 'No blog found under that id' });
            return;
        } else {
            res.status(200).json(blogData)
        }
    } catch {
        res.status(500).json(err)
    }
})

module.exports = router;
