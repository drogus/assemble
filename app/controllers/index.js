import Ember from 'ember';

const { inject, computed } = Ember;
const { service } = inject;
const { alias } = computed;

/**
  @class controller:index
  @extends Ember.Controller
 */

export default Ember.Controller.extend({
  /**
    An alias for the session service.

    @property session
    @type Service
   */
  session: service('session'),

  /**
    An alias for the session's current user

    @property currentUser
    @type Object
   */
  currentUser: alias('session.currentUser'),

  /**
    An alias for the session's current user's teams

    @property teams
    @type Object
   */
  teams: alias('session.currentUser.teams'),

  /**
    This attribute describes the latitude and longitude of the current user, when
    populated by the `getCurrentUserLocation` action on the index route..

    @attribute currentUserLocation
    @type String
    @default null
   */
  currentUserLocation: null,

  /**
    The text from the text field on the index page that will be used to create
    a new alert.

    @attribute newAlert
    @type String
    @default ''
   */
  newAlert: '',

  /**
    An attribute used to hold the chosen team's id on the dropdown menu, for use
    in `teamChoice`

    @attribute teamId
    @type String
    @default null
   */
  teamId: null,

  /**
    A computed property using the `teamId` from the dropdown menu to get the full
    team object from the store.

    @attribute teamChoice
    @type Object
   */
  teamChoice: computed('teamId', function() {
    return this.get('store').findRecord('team', this.get('teamId'));
  }),

  actions: {

    /**
      Logs out the current user.

      @private
      @event invalidateSession
    */
    invalidateSession() {
      this.get('session').invalidate();
    },

    /**
      Will eventually work to send alerts to members of chosen team, for now just
      creates and saves an alert.

      @event sendAlert
     */
    sendAlert() {
      let createAlert = this.get('store').createRecord('alert', {
        alertText: this.get('newAlert'),
        alertLocation: 'TBD', // still have to figure out how to get location reliably
        team: this.get('teamChoice')
      });

      createAlert.save();
    }
  }
});
