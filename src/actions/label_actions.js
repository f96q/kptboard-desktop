'use strict';

import uuid from 'uuid'
import FluxActions from './flux_actions'
import Dispatcher from '../dispatcher/dispatcher'
import LabelConstants from '../constants/label_constants'

class LabelActions extends FluxActions {
  constructor(dispatcher) {
    super(dispatcher);
  }

  setLabels(labels) {
    this.dispatch({
      type: LabelConstants.LABEL_SET_LABELS,
      labels: labels
    });
  }

  openDialog(retrospectiveId, label, clientX, clientY) {
    this.dispatch({
      type: LabelConstants.LABEL_OPEN_DIALOG,
      clientX: clientX,
      clientY: clientY,
      retrospectiveId: retrospectiveId,
      label: label
    });
  }

  create(retrospectiveId, label) {
    label.id = uuid.v4();
    this.dispatch({
      type: LabelConstants.LABEL_CREATE,
      label: label
    });
  }

  update(retrospectiveId, id, label) {
    this.dispatch({
      type: LabelConstants.LABEL_UPDATE,
      id: id,
      label: label
    });
  }

  destroy(retrospectiveId, id) {
    this.dispatch({
      type: LabelConstants.LABEL_DESTROY,
      id: id
    });
  }

  dragStart(id) {
    this.dispatch({
      type: LabelConstants.LABEL_DRAG_START,
      id: id
    });
  }

  dragEnd() {
    this.dispatch({
      type: LabelConstants.LABEL_DRAG_END
    });
  }

  drop(retrospectiveId, id, typ, index) {
    this.dispatch({
      type: LabelConstants.LABEL_DROP,
      id: id,
      typ: typ,
      index: index
    });
  }
}

export default new LabelActions(Dispatcher);
