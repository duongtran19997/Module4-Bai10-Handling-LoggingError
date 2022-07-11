import express from "express";
const router = express.Router();
import authPassport from "../middleware/passport";
import multer from 'multer';
import auth from "../middleware/auth";

const upload = multer();

router.get('/login', (req, res) => {
      res.render('login')
      }
);
router.post('/login', upload.none(), authPassport.authenticate('local', {
    successRedirect: '/book/list',
    failureRedirect: '/auth/login'
}))

router.get('/login/google', authPassport.authenticate('google', {scope: ['profile', 'email']}));

router.get(
    "/google/callback",
    authPassport.authenticate('google'),
    (req, res) => {
        res.redirect('/book/list')
    }
);

export default router;

