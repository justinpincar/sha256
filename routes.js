module.exports = function(App) {
  return {
    root: function(req, res){
      return res.render('index');
    },
    about: require('./routes/about')(App),
    games: require('./routes/games')(App),
  }
}

