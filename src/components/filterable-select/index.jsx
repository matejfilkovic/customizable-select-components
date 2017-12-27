import React from 'react'
import PropTypes from 'prop-types'

import withMenu from '../with-select-menu'

export class FilterableSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleBlur(event) {
    this.setState({ inputValue: '' })

    const {
      allOptions,
      setMenuOptions,
      onBlur
    } = this.props

    setMenuOptions(allOptions)
    onBlur(event)
  }

  handleFocus(event) {
    this.setState({ inputValue: '' })

    this.props.onFocus(event)
  }

  handleInputChange(event) {
    event.preventDefault()

    const { value } = event.target

    const {
      allOptions,
      setMenuOptions,
      showMenu
    } = this.props

    const optionsContainingInputValue = (
      allOptions.filter(option => (
        option.label
          .toLowerCase()
          .includes(value.toLocaleLowerCase())
      ))
    )

    setMenuOptions(optionsContainingInputValue)
    showMenu()

    this.setState({ inputValue: value })
  }

  render() {
    const {
      disabled,
      className,
      isFocused,
      selectedOptionLabel,
      setInputElementRef
    } = this.props


    const {
      inputValue
    } = this.state

    const inputValueToShow = isFocused ? inputValue : selectedOptionLabel

    return (
      <div>
        <input
          value={inputValueToShow}
          className={className}
          onChange={this.handleInputChange}
          disabled={disabled}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={setInputElementRef}
        />
      </div>
    )
  }
}

FilterableSelect.propTypes = {
  setMenuOptions: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  allOptions: PropTypes.array.isRequired,
  isFocused: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  selectedOptionLabel: PropTypes.string.isRequired,
  setInputElementRef: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

FilterableSelect.defaultProps = {
  disabled: false
}

export default withMenu(FilterableSelect)
