import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

/**
  @class route:application
  @extends Ember.Route
  @uses ApplicationRouteMixin
 */
export default Ember.Route.extend(ApplicationRouteMixin,{

  /**
    An alias for the session service.

    @property session
    @type Service
   */
  session: service(),

  /**
    A hook provided by Ember, called before `model` and `afterModel`. Called
    when an attempt is made to transition to a route. We are using it here to
    call the private method `_loadCurrentUserData`

    @method beforeModel
   */
  beforeModel() {
    return this._loadCurrentUserData();
  },

  /**
    A hook provided by Ember Simple Auth through the `ApplicationRouteMixin`,
    called when a session is authenticated.
    We are using it to call the private method `_loadCurrentUserData` before
    transitioning to the root route on login. `beforeModel` is not called on
    login so that's why we call `_loadCurrentUserData` on both. If `_loadCurrentUserData`
    fails for some reason, we log the user out automatically (invalide the session).

    @method sessionAuthenticated
   */
  sessionAuthenticated() {
    this._loadCurrentUserData().then(() => {
      this.transitionTo('/');
    }).catch(() => this.get('session').invalidate());
  },

  /**
    A private method whose only purpose is loading current user data from the
    session service. This includes properties of the user as well as their teams.

    @private
    @method _loadCurrentUserData
   */
  _loadCurrentUserData() {
    return this.get('session').loadCurrentUserData();
  }
});
