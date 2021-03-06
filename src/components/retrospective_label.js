'use strict';

import React from 'react'
import LabelActions from '../actions/label_actions'

export default class RetrospectiveLabel extends React.Component {
  destroy(event) {
    LabelActions.destroy(this.props.retrospectiveId, this.props.label.id);
    event.stopPropagation();
  }

  edit(event) {
    LabelActions.openDialog(this.props.retrospectiveId, {id: this.props.label.id}, event.clientX, event.clientY);
    event.stopPropagation();
  }

  onDragStart(event) {
    LabelActions.dragStart(this.props.label.id);
  }

  onDragEnd(event) {
    LabelActions.dragEnd();
  }

  render() {
    return (
      <div className={`js-label retrospective__label retrospective__label--${this.props.label.typ}`} onClick={this.edit.bind(this)} data-id={this.props.label.id} draggable="true" onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)}>
        <div className="retrospective__label-content">
          <div className="retrospective__label-header">
            <i className="retrospective__label-remove fa fa-remove" onClick={this.destroy.bind(this)}></i>
            <div className="retrospective__label-created-at">{this.props.label.created_at}</div>
            <div className="retrospective__label-user-name">{this.props.label.user_name}</div>
          </div>
          <div className="retrospective__label-description">{this.props.label.description}</div>
        </div>
      </div>
    );
  }
}
