'use strict';

import React from 'react'
import $ from 'jquery'
import store from 'store'
import LabelActions from '../actions/label_actions'
import LabelStore from '../stores/label_store'
import RetrospectiveLabel from './retrospective_label'

export default class Retrospective extends React.Component {
  constructor(props) {
    super(props);
    let state = store.get('state');
    if (state) {
      LabelActions.setLabels(state.labels);
    }
    this.state = this.getState();
  }

  componentDidMount() {
    LabelStore.addListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    LabelStore.removeListener(this.onChange.bind(this));
  }

  onChange() {
    let state = this.getState();
    store.set('state', state);
    this.setState(state);
  }

  getState() {
    return {
      dragStartId: LabelStore.getDragStatId(),
      labels: LabelStore.getLabels()
    };
  }

  openLabelForm(event) {
    let typ = $(event.target).closest('.js-board').data('typ');
    LabelActions.openDialog(this.props.id, {typ: typ}, event.clientX, event.clientY);
  }

  onDrop(event) {
    event.preventDefault();
    let typ = null;
    let index = null;
    if ($(event.target).hasClass('js-labels')) {
      typ = $(event.target).closest('.js-board').data('typ');
      index = this.state.labels[typ].length;
    } else {
      let id = $(event.target).closest('.js-label').data('id');
      typ = $(event.target).closest('.js-board').data('typ');
      for (let i in this.state.labels[typ]) {
        let label = this.state.labels[typ][i];
        if (label.id == id) {
          index = parseInt(i);
          break;
        }
      }
    }
    LabelActions.drop(this.props.id, this.state.dragStartId, typ, index);
  }

  onDragOver(event) {
    event.preventDefault();
  }

  render() {
    let keepLabels = this.state.labels.keep.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} />
      );
    });

    let problemLabels = this.state.labels.problem.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} />
      );
    });

    let tryLabels = this.state.labels.try.map((label) => {
      return (
        <RetrospectiveLabel key={label.id} retrospectiveId={this.props.id} label={label} />
      );
    });

    return (
      <div className="retrospective">
        <div className="retrospective__content">
          <div className="retrospective__boards">
            <div className="retrospective__board js-board" data-typ="keep" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Keep</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{keepLabels}</div>
            </div>

            <div className="retrospective__board js-board" data-typ="problem" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Problem</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{problemLabels}</div>
            </div>
          </div>

          <div className="retrospective__boards">
            <div className="retrospective__board js-board" data-typ="try" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Try</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{tryLabels}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
