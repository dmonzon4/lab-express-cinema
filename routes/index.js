const express = require('express');
const Movie = require("../models/Movie.model")
const router = express.Router();


/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

// GET "/movies" => nos muetra la lista de peliculas
router.get("/movies", (req, res, next) => {
    Movie.find()
    .select({title: 1, image: 1})
    .then ((response) => {
        console.log(response)
        res.render("movies", {
            allMovies: response
        })
    })
    .catch((err) => {
        next(err)
    })

});


// GET "movie/:id" => nos muetra la informacion de la pelicula seleccionada
router.get("/movie/:id", async (req, res, next) => {

    try{
        console.log(req.params)
        const response = await Movie.findById(req.params.id)

        res.render("details.hbs", {
            oneMovie: response
        })


    }catch(err) {
        next(err)
    }

})


module.exports = router;
