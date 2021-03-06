'use strict';

import React from 'react';

export default class LabelFormContent extends React.Component {
  onKeyDown(event) {
    if (event.keyCode == 13) {
      this.props.save();
    }
  }

  render() {
    return (
      <div className="retrospective__label-form">
        <textarea className="js-description" rows="10" defaultValue={this.props.label.description} onKeyDown={this.onKeyDown.bind(this)}></textarea>
      </div>
    );
  }
}
