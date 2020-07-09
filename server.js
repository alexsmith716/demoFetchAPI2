var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var dbs;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

MongoClient.connect('mongodb://localhost/fetchdbs', function(err, database) {
    if (err) {
      return console.log('MongoClient.connect > Error > ', err);
    }
    dbs = database
    app.listen(process.env.PORT || 3000, function() {
      console.log('MongoClient.connect > listening on 3000');
    });
});

app.set('views', 'views');
app.set('view engine', 'jade');


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


app.get('/', function(req, res) {
  console.log('############# > server > app.get');
  dbs.collection('myFavNoveltiesCollection').find().toArray( function(err, result) {
    if (err) {
      return console.log('############# > server > app.get > ERROR > ', err)
    }
    result.sort(function(a, b) {
      return parseFloat(b.time) - parseFloat(a.time);
	  })
    res.render('renderIndexView', {
    	title: "ThisGreatApp!",
      	pageHeader: {
        	header: "It\'s Summertime!",
        	miniHeader: "Let\'s talk about favorite cold treats..."
      	},
      	sideBlurb: "Nutty Buddy, Snow Cone, Iced Latte? When the temp heats-up, the enjoyment of something cold and sweet is the perfect cool-down. So, what is your favorite kick back and relax in the shade, summertime novelty?",
      	myFavNoveltiesCollection: result
    });
  });
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



app.post('/doPostPath', function(req, res) {
  dbs.collection('myFavNoveltiesCollection').save(req.body, function(err, result) {
    if (err) {
      return console.log('############# > server > app.post > ERROR')
    }
    if (result) {
      res.send(result)
    }
  })
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*
exports.updateAuto = function(req, res) {
  var ObjectId = require('mongodb').ObjectID;
  varDB.db.collection('autos').findOneAndUpdate({"_id": new ObjectId(req.params.id)}, req.body, {safe:true}, function(err, result) {
    if (err) {
      console.log('updateAuto > findOneAndUpdate > ERROR >', err)
    }
    if (result) {
      console.log('Udating auto: ', JSON.stringify(req.body));
      res.send(result)
    }
  });
};
*/


app.put('/doPutUpdate', function(req, res) {
  //return console.log('############# > server > app.put 1> ', req.body)
  //return console.log('############# > server > app.put 2> ', req.body.id)
  //return console.log('############# > server > app.put 3> ', req.params.id)
	var ObjectId = require('mongodb').ObjectID;
  	dbs.collection('myFavNoveltiesCollection').findOneAndUpdate({"_id": new ObjectId(req.body.id)}, {
    $set: {
      'firstName':req.body.firstName,
      'lastName':req.body.lastName,
      'city':req.body.city,
      'state':req.body.state,
      'favNovelties':req.body.favNovelties
    }
  },function(err, result) {
    	if (err) {
      		return console.log('############# > server > app.put > ERROR')
    	}
      	if (result) {
        	res.send(result)
      	}
	})
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


app.put('/doPutFind', function(req, res) {
	var ObjectId = require('mongodb').ObjectID;
  	dbs.collection('myFavNoveltiesCollection').findOne({"_id": new ObjectId(req.body.id)},function(err, result) {
    	if (err) {
      		return console.log('############# > server > app.put > ERROR')
    	}
      	if (result) {
        	res.send(result)
      	}
	})
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


app.delete('/doDelete', function(req, res) {
	var ObjectId = require('mongodb').ObjectID;
  	dbs.collection('myFavNoveltiesCollection').findOneAndDelete({"_id": new ObjectId(req.body.id)},function(err, result) {
    	if (err) {
      		return console.log('############# > server > app.put > ERROR')
    	}
      	if (result) {
        	res.send('Object deleted.')
      	}
  	})
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// GET FORM VIEW ++++++++++++++++++++++++++++
app.get('/addFavView', function(req, res) {
  res.render('addFavView', {
      title: 'Favorites',
      pageHeader: {
        header: 'Add your favorite cool treats'
      },
      sideBlurb: 'Nutty Buddy, Snow Cone, Iced Latte? When the temp heats-up, the enjoyment of something cold and sweet is the perfect cool-down. So, what is your favorite kick back and relax in the shade, summertime treat?'
    })
})

// GET ABOUT VIEW +++++++++++++++++++++++++++
app.get('/about', function(req, res) {
    res.render('basicView', {
      title: 'About',
      pageHeader: {
        header: 'About ThisGreatApp!'
      },
      content: 'ThisGreatApp! is all about people sharing their favorite novelties across America.\n\nAut tenetur sit quam aliquid quia dolorum voluptate. Numquam itaque et hic reiciendis. Et eligendi quidem officia maiores. Molestiae ex sed vel architecto nostrum. Debitis culpa omnis perspiciatis vel eum. Vitae doloremque dolor enim aut minus.\n\nPossimus quaerat enim voluptatibus provident. Unde commodi ipsum voluptas ut velit. Explicabo voluptas at alias voluptas commodi. Illum et nihil ut nihil et. Voluptas iusto sed facere maiores.'
    })
})

// GET CONTACT VIEW +++++++++++++++++++++++++++
app.get('/contact', function(req, res) {
    res.render('basicView', {
      title: 'Contact',
      pageHeader: {
        header: 'Contact ThisGreatApp!'
      },
      content: 'ThisGreatApp! can be contacted by calling 1-800-555-1234.\n\nDolorem necessitatibus aliquam libero magni. Quod quaerat expedita at esse. Omnis tempora optio laborum laudantium culpa pariatur eveniet consequatur.'
    })
})

// GET TEAM VIEW +++++++++++++++++++++++++++
app.get('/team', function(req, res) {
    res.render('basicView', {
      title: 'Team',
      pageHeader: {
        header: 'Meet the Team'
      },
      content: 'The team behind ThisGreatApp! are a dedicated bunch who enjoy sharing favorite places and experiences.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
    })
})




