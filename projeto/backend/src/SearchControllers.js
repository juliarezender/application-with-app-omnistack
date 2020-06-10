const Dev = require('./Dev');
const parseStringAsArray = require('./parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);
        // Buscar todos os devs no raio de 10 km
        // Filtrar por tecnologias
        const devs =  await Dev.find({ 
            techs: {
                // Operador lógico do mongoDB
                $in: techsArray,
            },
            location: {
                // ta dando pau no near, dps resolve
 //               $near: {
//                    $geometry: {
//                        type: 'Point',
//                       coordinates: [longitude, latitude],
//                    },
///                    $maxDistance: 10000, // 10 km de distancia maxima
//                },
            },
        });
        console.log(request.query);
        return response.json({ devs: [] });
    }
}