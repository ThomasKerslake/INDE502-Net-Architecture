const noteRoutes = require('./notes_routes');

module.exports =(app, client) =>{
  noteRoutes(app, client);
};
