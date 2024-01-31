const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login_signup');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;