var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

let listOfWorks = [
  {title: 'Adobe',
  link: 'https://claudia00.github.io/htmlPages/HunterClasses/AdobeIntro/index.html',
  image: '/img/NaviLink.jpeg',
  note:'Software used: PS + Ai'
},
{title: '3D Animation',
  link: 'https://claudia00.github.io/htmlPages/LaGuardiaClasses/3DBlender/index.html',
  image: '/img/sombra1.gif',
  note:'Software used: PS + Ai'
},
// {title: 'Tech Projects',
//   link: 'https://zombo.com',
//   image: '/img/soraDestiny.jpeg',
//   note:'Software used: PS + Ai'
// },
{title: 'Game Projects',
  link: 'https://claudia00.github.io/htmlPages/LaGuardiaClasses/GameDesign/index.html',
  image: '/img/bendy.png',
  note:'Software used: PS + Ai'
}]
// if you want to add your work to a partial
// middleware to add list data to context
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
  // 	res.locals.partials.listOfWorks = listOfWorks;
 	next();
});


let moreInfo = ['My favorite software is Adobe', 'My favorite food is corn + fish', "I was once interviewed by GameStop"]
let secretMessage = ['this is a secret message, how dare you find it T.T']
//home
app.get('/', function(req, res) {
  res.render('home');
});

//about
app.get('/about', function(req,res){
	res.render('about', {
		moreInfo: moreInfo
	});
});

//work
app.get('/my-work', function(req, res) {
  res.render('works', {
    works: listOfWorks
  })
})

//secretPage
app.get('/secretPage', function(req, res){
  res.render('secret',{
    secretMessage : secretMessage

  })
})


app.get('/works/:number', function(req, res) {
 let pageIndex = parseInt(req.params.number)
  console.log('page index: ', pageIndex)
  let nextPage = pageIndex + 1< listOfWorks.length ? pageIndex + 1 : false
  console.log('next page: ', nextPage)
  res.render('work', {
    work: listOfWorks[pageIndex],
    nextPage: nextPage
  })
})

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
