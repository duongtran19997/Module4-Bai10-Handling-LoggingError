"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = {
    autoCheck: function check(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('1');
            next();
        }
        else {
            res.redirect('/auth/login');
        }
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map