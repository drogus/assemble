import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(),

  model() {
    return this.get('session.currentUser').get('teams');
  }
});
