const express = require('express')
const app = express()

const bodyParser = require('body-parser')
require('dotenv').config()
const MongoClient  = require('mongodb').MongoClient


const firebase = require('firebase/app');
const database = require('firebase/database')


function addQuotes(name, quote) {
	var newSenhasKey =  database.push(database.child(database.ref(db), 'quotes/')).key;
	database.set(database.ref(db, `quotes/${newSenhasKey}`), {
		name: name,
		quote: quote,
	}).then(() => {
		console.log('Adicionado com sucesso!', {name: name, quote: quote})
	}).catch((error) => {
		console.log('Nao adicionado')
	});
}

function recuperarDados() {
  const starC = database.ref(db, 'quotes/')
  database.onValue(starC, snap => {
    const data = snap.val()
    console.log(data)
  })
}

const firebaseConfig = {
	apiKey: "AIzaSyB-1Oqa0rCXLZv1mJGM0W4D63U9HE1lJ4s",
	authDomain: "bamboo-analyst-271911.firebaseapp.com",
	databaseURL: "https://bamboo-analyst-271911.firebaseio.com",
	projectId: "bamboo-analyst-271911",
	storageBucket: "bamboo-analyst-271911.appspot.com",
	messagingSenderId: "790844234696",
	appId: "1:790844234696:web:f38ad2a1a34c794b9b7efd"
};

firebase.initializeApp(firebaseConfig);
var db = database.getDatabase()


const PORT = process.env.PORT || 8080


app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	let array = []
	const starC = database.ref(db, 'quotes/')
	let result = database.onValue(starC, snap => {
		snap.forEach(child => {
			const chave = child.key
			const name = child.val().name
			const quote = child.val().quote
			let objt = new Object();
			objt.chave = chave;
			objt.name = name;
			objt.quote = quote;
			array.push(objt)

		})
	})	
	res.render('index.ejs', {quotes: array})

	
})

app.put('/quotes', (req, res) => {
  const starC = database.ref(db, nomeTabela)
  database.onValue(starC, snap => {
    snap.forEach(dado => {
    	if('Darth Vadar' == req.body.name) {
    		database.update(database.ref(db, `quotes/${req.key}`), {
    			name: 'Yoda',
    			quote: 'I find your lack of faith disturbing.'
			  })
    	}
    })
    
  })
})

app.post('/quotes', (req, res) => {
	var newSenhasKey =  database.push(database.child(database.ref(db), 'quotes/')).key;
	database.set(database.ref(db, `quotes/${newSenhasKey}`), {
		name: req.body.name,
		quote: req.body.quote
	}).then(() => {
		let result = { name: req.body.name, quote: req.body.quote }
		console.log('Cadastrado com sucesso!, ' + result)
		res.redirect('/')
	})
	.catch(err => console.log(err))	
})

app.listen(PORT, () => {
	console.log(`Servidor Rodando: ${process.env.HOST}${PORT}`)
})