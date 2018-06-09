const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append to server.log.');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     maintenanceMessage: 'The site is currently being updated.'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// register http route handlers:
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the page'
  });
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Thomas',
  //   likes: [
  //     'Rapid',
  //     'Rotterdam',
  //     'New York'
  //   ]
  // })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',    
    projectsMessage: 'Overview of my projects:'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}, oida.`);
});
