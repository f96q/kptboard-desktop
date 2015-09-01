'use strict';

export default class FluxActions {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  dispatch(params) {
    this.dispatcher.dispatch(params);
  }
}
