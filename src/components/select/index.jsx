import React from 'react'
import PropTypes from 'prop-types'

import withMenu from '../with-select-menu'

export class Select extends React.Component {
  render() {
    const {
      disabled,
      className,
      selectedOptionLabel,
      setInputElementRef,
      onBlur,
      onFocus
    } = this.props

    return (
      <div>
        <input
          value={selectedOptionLabel}
          className={className}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={setInputElementRef}
        />
      </div>
    )
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string.isRequired,
  selectedOptionLabel: PropTypes.string.isRequired,
  setInputElementRef: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
}

Select.defaultProps = {
  disabled: false
}

export default withMenu(Select)
