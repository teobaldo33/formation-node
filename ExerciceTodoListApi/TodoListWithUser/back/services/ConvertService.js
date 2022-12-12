const axios = require('axios')

exports.getChangeRate = async (devise) => {
    const result = await axios.get('https://happyapi.fr/api/devises', { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })
    const monnaie = result.data.result.result.devises.filter(x => x.codeISODevise === devise)[0];
    return monnaie.taux;
}