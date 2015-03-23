/** @jsx React.Dom */
var app = app || {};
var Router = ReactRouter; // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

(function() {
  'use strict';
 app.init = function() {
  var App = app.components.App;
  var Inbox = app.components.Inbox;
  var Calendar = app.components.Calendar;
  var Dashboard = app.components.Dashboard;
  var Login = app.components.Login;
  var Logout = app.components.Logout;
  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="inbox" handler={Inbox}/>
      <Route name="calendar" handler={Calendar}/>
      <Route name="login" handler={Login}/>
      <Route name="logout" handler={Logout}/>
      <DefaultRoute handler={Dashboard}/>
    </Route>
  );
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('example'));
  });
 };
  app.init();
})();

   