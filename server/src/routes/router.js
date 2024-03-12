const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    return res.json({
        message: 'this is home'
    })
})

router.all("*", (req, res) => {
    return res.status(200).json({
        message: 'This might not be page you are looking for:'
    })
})

module.exports = router