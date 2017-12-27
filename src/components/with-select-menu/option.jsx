import React from 'react'
import PropTypes from 'prop-types'

import { OPTION_PROP_TYPE } from '../types'

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

export default function Option(props) {
  const {
    option,
    onClick,
    onHover,
    hoveredIndex,
    renderOptionContent,
    index
  } = props

  return (
    <li
      onMouseDown={() => onClick(option.value)}
      onMouseEnter={() => onHover(index)}
      key={option.value}
    >
      {
        renderOptionContent({
          option,
          hovered: hoveredIndex === index
        })
      }
    </li>
  )
}

Option.propTypes = {
  option: OPTION_PROP_TYPE.isRequired,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  hoveredIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  renderOptionContent: PropTypes.func.isRequired
}
