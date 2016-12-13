//  thisAnimal.setArt()
//findall
//forloop voor elk dier, zoek of het voorkomt in art.animal

'use strict'

let db = require(__dirname + '/../../modules/database')

db.Animal.findAll({
	order: [['name', 'ASC']]
}).then( (animals) => {
	for (var i = 0; i < animals.length; i++) {
		console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
		console.log(animals[i].name)
		db.Art.findAll({
			where: {
				animal: {
					$like: '%'+animals[i].name+'%'
				}
			}
		}).then( (arts) => {
			console.log('THIS IS THE RESULT:' + arts)
		})
	}
})
