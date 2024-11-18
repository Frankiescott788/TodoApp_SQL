const db = require('better-sqlite3')('data.db');

function Authenticate (req, res, next) {
    const { auth_token } = req.cookies;
    if(auth_token !== undefined){
        const user = db.prepare('SELECT * FROM users WHERE _id = ?').get(auth_token);
        if(user._id === auth_token){
            req.user = user;
            next();
        } else {
            res.status(401).json({ message: 'Unauthorised' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorised' });
    }
}

module.exports = Authenticate