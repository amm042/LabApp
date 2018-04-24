/*jshint esversion: 6 */
export default function (req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ sub: req.session.user.sub }, function (err, user) {
            if (user) {
                req.user = user;
                req.session.user = user; //refresh the session value
                res.locals.user = user;
            }
            // finishing processing the middleware and run the route
            next();
        });
    }
    else {
        next();
    }
}
