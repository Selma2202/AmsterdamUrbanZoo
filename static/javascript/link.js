
'use strict'

let db = require(__dirname + '/../../modules/database')

function linkArt( currentAnimal ) {
	console.log(currentAnimal.name + ' triggered')
	db.Art.findAll({
		where: {
			animal: {
				$iLike: '%'+currentAnimal.name+'%'
			}
		}
	}).then( (arts) => {
		console.log('The ' + currentAnimal.name + ' count: ' + arts.length)
		for (let i = arts.length - 1; i >= 0; i--) {
			arts[i].setAnimals(currentAnimal)
		}
	})
}

setTimeout(function(){
	db.Animal.findAll({
		order: [['name', 'ASC']]
	}).then( (animals) => {
		for (var i = 0; i < animals.length; i++) {
			linkArt( animals[i] )
		}
	})

}, 5000)

function checkUnlinked() {
	db.Art.findAll({
		include: [db.Animal]
	}).then( arts => {
		for (let i = arts.length - 1; i >= 0; i--) {
			if (arts[i].animals.length == 0) {
				console.log(arts[i])
			}
		}
	})
}