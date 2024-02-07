const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

//post new comment
router.post('/', withAuth, async (req, res) => { 
    try {
        const newComment = req.body
        newComment.user_id=req.session.user_id
        const commentData = await Comment.create(newComment);

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req. params.id,
                user_id: req.session.user_id
            }
        })
        if(!commentData) {
            res.status(404).json({ merssage: 'No comment found' });
            return;
        } else {
            res.status(200).json(commentData)
        }
    } catch {
        res.status(500).json(err)
    }
})

module.exports = router;
