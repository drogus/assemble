import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from 'assemble/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'assemble/tests/helpers/ember-simple-auth';

let StubGoogleMap = Ember.Service.extend({
  initMap() {}
});

moduleForAcceptance('Acceptance | dashboard', {
  beforeEach() {
    this.application.register('service:mock-google-map', StubGoogleMap);
    this.application.inject('component', 'googleMap', 'service:mock-google-map');
  }
});

test('visiting /', function(assert) {
  const user = server.create('user', { username: "Alice", email: 'alice@example.com', password: 'alicepassword' });
  authenticateSession(this.application, { email: user.email, token: 'abc123' });

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.hello-user').text(), 'Hello Alice!');
  });
});
