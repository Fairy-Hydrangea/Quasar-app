const router = require('express').Router();
const todoController = require('./_controller/dodoController');
router.get('/', (req,res)=>{
  const result = todoController.getText();
  res.json(result);
})

module.exports = router;
