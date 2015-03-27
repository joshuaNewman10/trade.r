/** @jsx React.Dom */

var app = app || {};
app.components = app.components || {};
var test = 'hi';
(function() {
  app.auth = {
    users: [
      {email: 'email1@fake.com', password: 'password12345', token: 'abcdefg'}
    ],

    loggedIn: false,


    login: function(email, password, callback) {
       this.authorizeUser(email, password, function(response) {
          if ( response.authenticated ) {
            this.loggedIn = true;
             callback(loggedIn);
          } else {
            callback(loggedIn);
          }
       });
    },

    logout: function(callback, targetEmail) {
     for(var i=0; i<this.users.length; i++) {
      if ( this.users[i].email === targetEmail ) {
        this.users[i].token = '';
        this.loggedIn = false;
        callback(true);
      }
     }
     callback(false);
    },

    getToken: function() {
    
    },

    signup : function(email, password, callback) {
      if ( checkNewUser ) {
        this.users.push({email: email, password: password, token: makeToken()});
        this.loggedIn = true;
        callback(true); //successfully created user
      }
      callback(false); //user already in db
    },

    authorizeUser : function(email, password, callback) {
      var users = this.users;
      console.log(users, email, password);
      for(var i=0; i<users.length; i++) {
        if ( users[i].email === email & users[i].password === password) {
          callback({authenticated: true, token: users[i].token});
        }
      }
      callback({authenticated: false});
    },

    makeToken : function() {
      var token = '';
      var chars = ['abcdefgkzasdzx'];
      while( token.length < 10 ) {
        token += chars[Math.floor(Math.random()*chars.length)];
      }
      return token;
    },

    checkNewUser : function(email) {
      var users = auth.users;
      for(var i=0; i<users.length; i++) {
        if ( users[i].email === email) {
          return false;
        }
      }
      return true;
    }
  };
})();