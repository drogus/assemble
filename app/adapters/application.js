import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import ENV from 'assemble/config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.apiHost,
  authorizer: 'authorizer:devise'
});
