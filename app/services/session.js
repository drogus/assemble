import DS from 'ember-data';
import Session from "ember-simple-auth/services/session";

export default Session.extend({

  store: Ember.inject.service(),

  currentUser: Ember.computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      const promise = Ember.$.getJSON("http://localhost:3000/users/me");
      return DS.PromiseObject.create({ promise: promise })
    }
  })

});
