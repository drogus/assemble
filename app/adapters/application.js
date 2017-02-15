import ActiveModelAdapter from 'active-model-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'assemble/config/environment';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
  host: ENV.apiHost,
  authorizer: 'authorizer:devise'
});
