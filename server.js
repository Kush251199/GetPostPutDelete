var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var ingredients = [{
        "id": "232AK",
        "text": "Baccon"
    },
    {
        "id": "dkcuu7",
        "text": "Milk"
    },
    {
        "id": "hbhj25",
        "text": "Eggs"
    },
    {
        "id": "bdsaj7",
        "text": "Frog Eggs"
    }
];

app.get('/ingredients', function(req, res) {
    res.send(ingredients);
});

app.post('/ingredients', function(req, res) {
    var ingredient = req.body;
    if (!ingredient || ingredient.text == "") {
        res.status(500).send({ error: "Your ingredient must have text" });
    } else {
        ingredients.push(ingredient);
        res.status(200).send(ingredients);
    }
});

app.delete('/ingredients', function(req, res) {

	var ingredientName = req.body.text;
		objectFound = true;
	if(!(ingredientName === "")){
	for(x=0; x<ingredients.length; x++) {
		var ingredient = ingredients[x]
		if(ingredientName === ingredient.text){
			ingredients.splice(x,1);
			objectFound = false;
			break;
		}
	}
}
	if(!objectFound){
		res.status(200).send(ingredients);
	}
	else if (objectFound) {
		res.status(500).send({error: "Please enter an existing ingredient name."})
	}

    });

app.put('/ingredients/:ingredientId', function(req, res) {

    // var ingredientId = req.params.ingredientId;
    var newText = req.body.text;

    if (!newText || newText === "") {
        res.status(500).send({ error: "You must provide ingredient text." })
    } else {
        var objectFound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];

            if (ing.id === req.params.ingredientId) {
                ingredients[x].text = newText;
                objectFound = true;
                break;
            }
        }

        if (!objectFound) {
            res.status(500).send({ error: "Ingredient id not found." })
        } else {
            res.send(ingredients);
        }
    }

});

app.get('/me', function(req, res) {
    res.send("My name is Kush.");
});

app.listen(3000, function() {
    console.log("First API running on port 3000!");
});