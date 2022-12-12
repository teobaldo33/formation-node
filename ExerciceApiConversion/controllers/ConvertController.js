const convertService = require('../services/ConvertService');

exports.convert = (req, res)=>{
    convertService.getChangeRate(req.body.devise).then((taux)=>{
        let returnValue = req.body.value*taux;
        res.json({value: returnValue});
    })
}
