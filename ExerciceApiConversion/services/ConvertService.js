const axios = require('axios')

exports.getChangeRate = async (devise) => {
    
    const result = await axios.get('https://happyapi.fr/api/devises', { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })

}






// post /convert {value: 1, devise:"USD"}