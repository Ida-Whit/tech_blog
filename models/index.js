const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment')

User.hasMany(Blog);

User.hasMany(Comment);

Blog.belongsTo(User);

Blog.hasMany(Comment);

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'RESTRICT'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'RESTRICT'
});

module.exports = { User, Blog, Comment };