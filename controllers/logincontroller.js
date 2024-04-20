const { Login } = require('../models/loginmodel');


const LoginController = {
  checkLogin: async(req, res) => {
    
    try {
      const username = req.body.username;
      const userEmail = req.body.user_email;
      const user = await Login.verifyUser(username, userEmail);
      if (user.length == 1) {
        console.log("found user", user[0].user_id);
        req.session.user_id = user[0].user_id;
        req.session.user_name = user[0].username;
        req.session.user_email = user[0].user_email;

        return res.redirect(302, "/feed");
      } else {
        console.log("no user found", user.length);
      }
    } catch (error) {
      console.log("checkLogin error", error);
    }
  },

  showLogin: async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.error("Error showing login:", error);
        res.status(500).send("Error showing login");
    } 
  },
  logout: async (req, res) => {
    req.session.destroy(function (err) {
      if (err) console.log("session end error", err);
    });

    console.log("session destroyed", req.session);
    return res.redirect(302, "/login");
  }
};

module.exports = LoginController;



