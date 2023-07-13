const router = require('express').Router();
const userRouter = require('./controllers/users/index');
const bookRouter = require('./controllers/books/index');
const notFound = require('./middlewares/not-found');

router.use('/users',userRouter);
router.use('/books',bookRouter)

router.use(notFound)



module.exports = router;


