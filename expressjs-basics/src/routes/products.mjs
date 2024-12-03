import { Router } from "express"

const router = Router();

router.get('/products', (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies); //needs cookieparser library
    if(req.cookies.hello && req.cookies.hello === 'world'){
        res.send({id: 123, username: 'chicken breast', price: 12.99})
    }
    return res.status(403).send({msg: 'Wrong cookie'})
})

export default router;