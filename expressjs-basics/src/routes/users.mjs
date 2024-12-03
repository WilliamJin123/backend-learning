import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator"
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validation-schemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
const router = Router();

router.get("/users", query('filter').isString().withMessage('must be string').notEmpty().withMessage('must be not empty').isLength({ min: 3, max: 10 }).withMessage('must be 3-10 char'), (req, res) => {
    console.log(req.query)
    const result = validationResult(req);
    console.log(result)
    const { query: { filter, value } } = req;
    if (!filter && !value) {
        return res.send(mockUsers)
    }
    else if (filter && value) {
        return res.send(mockUsers.filter(user => user[filter].includes(value)))
    }
    return res.send(mockUsers)
})

router.post('/users',
    // [body('username').notEmpty().withMessage('username must not be empty')
    // .isLength({min: 5, max:32}).withMessage('must be 5-32 char')
    // .isString().withMessage('must be string'),
    // body('displayName').notEmpty().withMessage('displayname must not be empty')],

    checkSchema(createUserValidationSchema),

    (req, res) => {
        const result = validationResult(req)
        console.log(result)
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() })
        }

        const data = matchedData(req) //your data
        console.log(data)
        const newUser = {
            id: mockUsers[mockUsers.length - 1].id + 1,
            ...data
        }
        mockUsers.push(newUser)
        return res.status(201).send(newUser)
    })

router.get('/users/:id', resolveIndexByUserId, (req, res) => {
    const {findUserIndex} = req
    return res.send(mockUsers[findUserIndex])
})


router.put('/users/:id', resolveIndexByUserId, (req, res) => {
    const {body, findUserIndex} = req
    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body}
    return res.sendStatus(204)
})

router.patch('/users/:id', resolveIndexByUserId, (req, res) => {
    const {body, findUserIndex} = req;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body}
    return res.sendStatus(204)
})

router.delete('/users/:id', (req, res) => {
    const {body, 
        params: {id}
    } = req;
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) {
        return res.sendStatus(400)
    }
    const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
    if (findUserIndex === -1) {
        return res.sendStatus(404)
    }
    mockUsers.splice(findUserIndex, 1)
    return res.sendStatus(200)
})

export default router;