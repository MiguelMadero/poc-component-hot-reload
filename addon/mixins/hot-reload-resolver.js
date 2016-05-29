import Ember from 'ember';
import HotReplacementComponent from 'poc-component-hot-reload/components/hot-replacement-component';

export default Ember.Mixin.create({
  resolveTemplate () {
    console.log('Called resolveTemplate', arguments);
    return this._super(...arguments);
  },
  resolveOther (parsedName) {
    const resolved = this._super(...arguments);
    if (resolved && parsedName.type === 'component') {
      // TODO: make sure we only need it for components that may actually change, not for *every* component
      return this._resolveComponent(resolved, parsedName);
    }
    return resolved;
  },

  _resolveComponent (resolved, parsedName) {
    return HotReplacementComponent.extend({
      wrappedComponent: resolved,
      parsedName: parsedName,
      resolver: this  // We need to pass this since each app might override the default, so we don't want to just ES import ours
    });
  }
});