//Placeholder authorization library

var auth = {
  users: [
    {email: 'email1@fake.com', password: 'password12345', token: 'abcdefg'}
  ],

  login: function(email, password, callback) {
     authorizeUser(email, password, function(response) {
        if ( response.autenticated ) {
           callback(true);
        } else {
          callback(false);
        }
     });
  },

  logout: function(callback, targetEmail) {
   for(var i=0; i<this.users.length; i++) {
    if ( this.users[i].email === targetEmail ) {
      this.users[i].token = '';
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
      callback(true); //successfully created user
    }
    callback(false); //user already in db
  }
};

var authorizeUser = function(email, password, callback) {
  var users = auth.users;
  for(var i=0; i<users.length; i++) {
    if ( users[i].email === email & users[i].password === password) {
      callback({authenticated: true, token: users[i].token});
    }
  }
  callback({authenticated: false});
};

var checkNewUser = function(email) {
  var users = auth.users;
  for(var i=0; i<users.length; i++) {
    if ( users[i].email === email) {
      return false;
    }
  }
  return true;
};

var makeToken = function() {
  var token = '';
  var chars = ['abcdefgkzasdzx'];
  while( token.length < 10 ) {
    token += chars[Math.floor(Math.random()*chars.length)];
  }
  return token;
};