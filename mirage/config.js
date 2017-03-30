import Mirage from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'http://localhost:3000';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  this.get('/users/me', function(schema, request) {
    let authorization = request.requestHeaders['Authorization'],
        match = authorization.match(/Token token="[^"]+", email="([^"]+)"/),
        email = match && match[1],
        user;

    if (email) {
      user = schema.users.findBy({ email });
    }

    if (user) {
      return user;
    } else {
      return new Mirage.Response(401);
    }
  });

  this.get('/teams', function(schema, request) {
    let user = schema.users.find(request.queryParams.user_id);

    return user.teams;
  });
}
