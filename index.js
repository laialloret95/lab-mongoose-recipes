const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    return console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have ensured that the connection was made
    const data = {
      title: 'pasta peperoncino',
      level: 'Easy Peasy',
      ingredients: ['pasta', 'peperoncino', 'olive oil'],
      cuisine: 'italian',
      dishType: 'main_course',
      image: 'https://www.melarossa.it/wp-content/uploads/2018/05/pasta-aglio-olio-peperoncino.jpg?x96257',
      duration: 5,
      creator: 'Laia Lloret',
      created: '2020-04-19'
    }
    return Recipe.create(data)
  })
  .then(() => {
   const pastaPepe = Recipe.find( {title: 'pasta peperoncino'} );
  })
  .then((pastaPepe) => {
    console.log(pastaPepe);
  })
  .then(() => {
    Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then(() => {
    console.log('Carrot Cake removed');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
