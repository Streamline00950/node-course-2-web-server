const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware
app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = (`${now}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log.');
        }
    })
    next();
});
//Middleware   - bez next(), nie wykona sie nic innego
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// })
//Middleware
app.use(express.static(__dirname + '/public'));


//funkcja, ktora uzyjemy w templatce
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.get('/', (req,res)=>{
    // res.send('<h1>Hello world!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: "Welcome to my website!"
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: 'Something went wrong :/' 
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000...')
});