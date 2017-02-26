import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'assemble/config/environment';

export default AjaxService.extend({
  session: Ember.inject.service(),
  host: ENV.apiHost,
  headers: Ember.computed('session.authToken', {
    get() {
      let headers = {};
      const authToken = this.get('session.data.authenticated.token');
      const email = this.get('session.data.authenticated.email');
      if (authToken) {
        headers['Authorization'] = `Token token="${authToken}", email="${email}"`;
      }
      return headers;
    }
  })
});
