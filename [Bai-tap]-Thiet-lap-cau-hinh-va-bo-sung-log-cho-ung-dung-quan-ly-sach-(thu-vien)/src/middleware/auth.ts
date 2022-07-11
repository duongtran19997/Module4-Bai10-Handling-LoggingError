const auth = {
   autoCheck: function check(req, res,next) {
      if(req.isAuthenticated()) {
         console.log('1')
         next()
      }else{
         res.redirect('/auth/login')
      }
}
}

export default auth