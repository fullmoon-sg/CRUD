const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const axios = require("axios");

const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layout');

app.use(express.urlencoded({
    extended: false
}))

const baseURL = "https://ckx-movies-api.herokuapp.com/movies";
//The "/" is to read the baseURL. We can also add "/abc" if we can. It is just that we need to add "/abc" to the back of the url
app.get('/', async(req,res)=> {

    let response = await axios.get(baseURL);
     res.render('all_movies.hbs', {
        'movie' : response.data
        //The 'movie' will auto fetch the information from response.data. The response.data is a axio thingy. 
        //Once the data is fetched, all the information in the movie JSON will auto match those in all_movies.hbs
        //for example "this.id"
     });
})

app.get('/movies/create',(req,res) =>{

    res.render('new_movie.hbs')
})

//The "movies/create" is based on the server protocol to add inform to the movies server. We can give it any name we want
//if it is our own's server
app.post('/movies/create', (req,res) => {
//put the variable from new_movie.hbs
    let addMovie = {
        'title' : req.body.title,
        'content' : req.body.content
    }
     
     let response = axios.post(baseURL + '/movie/create', addMovie)
   //This is the axios.post method. '/movie/create is the server protocol and must follow
     res.redirect('/')
     //Redirect is go to the original loading page. A '/' is like home. 

})







app.listen(3000,function(){
    console.log("Server started")
})