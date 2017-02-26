import Session from "ember-simple-auth/services/session";
import Ember from 'ember';

const { service } = Ember.inject;

/**
  A service extending Ember Simple Auth's provided `session` service.
  Used primarily for providing information on the current user.

  @class service:session
  @extends ember-simple-auth/services/session
  @type Ember.Service
*/

export default Session.extend({

  /**
    An alias for injecting Ember Data's store service.

    @property store
    @type Service
   */
  store: service(),

  ajax: service(),

  currentUser: null,

  /**
    A method to get and set the current user's data if authenticated.

    @public
    @method loadCurrentUserData
  */
  loadCurrentUserData() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (this.get('isAuthenticated')) {
        return this.get('ajax').request('/users/me').then(user => {
            this.get('store').pushPayload(user);
            let storeUser = this.get('store').peekRecord('user', user.data.id);
            this.set('currentUser', storeUser);
            resolve();
          }, function(error) {
            console.log("REJECTED: " + error);
            reject();
          });
      } else {
        resolve();
      }
    });
  }
});
