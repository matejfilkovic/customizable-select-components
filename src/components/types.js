import PropTypes from 'prop-types'

export const VALUE_PROP_TYPE = (
  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
)

export const OPTION_PROP_TYPE = (
  PropTypes.shape({
    value: VALUE_PROP_TYPE
  })
)

export const OPTIONS_PROP_TYPE = (
  PropTypes.arrayOf(OPTION_PROP_TYPE)
)

export class Event {
  constructor(id, value) {
    this.target = {
      id,
      value
    }
  }
}
