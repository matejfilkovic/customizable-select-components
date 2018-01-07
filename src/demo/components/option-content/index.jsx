import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default function OptionContent(props) {
  const {
    option,
    hovered
  } = props

  const className = classnames(
    'select__option',
    {
      'select__option--hovered': hovered
    }
  )

  return (
    <div
      className={className}
    >
      {option.label}
    </div>
  )
}

OptionContent.propTypes = {
  hovered: PropTypes.bool.isRequired,
  option: PropTypes.shape({
    label: PropTypes.string
  }).isRequired
}
