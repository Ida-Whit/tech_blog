const router = require('express').Router();
const { Blog } = require('../../models');

//Create new blog post
router.post('/', async (req, res) => {
    try{
        const blogData = await Blog.create({
            author: req.body.author,
            title: req.body.title,
            content: req.body.content,
            date: req.body.content
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
});

//Update blog post
router.put('/:id', async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.body.id,
                user_id: req.body.user_id
            }
        })
        if(!blogData) {
            return res.status(404).json({ error: 'Blog post not found' }) }
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete blog post
router.delete('/', async (req, res) => {
    try {
        const blogToDelete = await Blog.findByPk({ where: {id: req.body.id} });
        if (!blogToDelete) {
            return res.status(404).json({ error: 'Blog post not found' });
          }
        await blogToDelete.destroy();
        res.json({ message: 'Blog post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    };
});

module.exports = router;
