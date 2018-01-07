import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Option from './option'

import {
  Event,
  OPTIONS_PROP_TYPE,
  VALUE_PROP_TYPE
} from '../types'

import './index.scss'

const UNSELECTED_OPTION = -1

const INITIAL_STATE = {
  menuExpanded: false,
  hoveredIndex: UNSELECTED_OPTION,
  menuOptions: [],
  isFocused: false
}

export default function withSelectMenu(
  Component
) {
  class WithMenu extends React.Component {
    constructor(props) {
      super(props)

      const functionsToBind = [
        'handleClickOutside',
        'handleKeyDown',
        'changeSelectedValue',
        'setMenuOptions',
        'setInputElementRef',
        'showMenu',
        'handleBlur',
        'handleFocus',
        'handleOptionHover',
        'getOptionsStyle'
      ]

      functionsToBind.forEach(func => (this[func] = this[func].bind(this)))

      this.state = {
        ...INITIAL_STATE
      }
    }

    componentWillMount() {
      const { options } = this.props

      if (options && options.length) {
        this.setState({ menuOptions: options })
      }
    }

    componentWillReceiveProps(nextProps) {
      // When new options are received, pass them
      // to state.
      if (this.props.options !== nextProps.options) {
        this.setState({
          ...this.state,
          hoveredIndex: UNSELECTED_OPTION,
          menuOptions: nextProps.options
        })
      }
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handleBlur() {
      const {
        onBlur,
        id
      } = this.props

      if (onBlur) onBlur(new Event(id, this.props.value))

      this.setState({
        isFocused: false,
        menuExpanded: false
      })
    }

    handleFocus() {
      const {
        onFocus,
        id
      } = this.props

      if (onFocus) onFocus(new Event(id, null))

      this.setState({
        isFocused: true,
        menuExpanded: true
      })
    }

    changeSelectedValue(value) {
      this.setState({ menuExpanded: false })

      const {
        onChange,
        id
      } = this.props

      onChange(new Event(id, value))

      this.handleBlur()
    }

    handleKeyDown(event) {
      if (this.props.disabled) return

      const {
        menuExpanded,
        hoveredIndex,
        menuOptions
      } = this.state

      if (!menuOptions || !menuOptions.length) return null

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()

          if (!menuExpanded) {
            return this.setState({ menuExpanded: true })
          }

          if (
            (hoveredIndex === UNSELECTED_OPTION) ||
            ((hoveredIndex + 1) === menuOptions.length)
          ) {
            this._menuRef.scrollTop = 0

            return this.setState({ hoveredIndex: 0 })
          }

          return this.setState({ hoveredIndex: hoveredIndex + 1 })
        case 'ArrowUp':
          event.preventDefault()

          if (!menuExpanded) {
            return this.setState({ menuExpanded: true })
          }

          if (
            (hoveredIndex === UNSELECTED_OPTION) ||
            (hoveredIndex === 0)
          ) {
            this._menuRef.scrollTop = this._menuRef.scrollHeight

            return this.setState({ hoveredIndex: menuOptions.length - 1 })
          }

          return this.setState({ hoveredIndex: hoveredIndex - 1 })
        case 'Enter':
          if (!menuExpanded) {
            return (
              this.setState({
                menuExpanded: true
              })
            )
          }

          if (hoveredIndex === UNSELECTED_OPTION) return null

          this.changeSelectedValue(menuOptions[hoveredIndex].value)

          return (
            this.setState({
              menuExpanded: false,
              hoveredIndex: UNSELECTED_OPTION
            })
          )
        case 'Escape':
          if (menuExpanded) {
            return (
              this.setState({
                menuExpanded: false,
                hoveredIndex: UNSELECTED_OPTION
              })
            )
          }

          this.setState({
            menuExpanded: false,
            hoveredIndex: UNSELECTED_OPTION
          })

          return this.changeSelectedValue(null)
        case 'Tab':
          return (
            this.setState({
              menuExpanded: false,
              hoveredIndex: UNSELECTED_OPTION
            })
          )
        default:
          return null
      }
    }

    handleClickOutside(event) {
      // User has clicked outside of a select
      // div wrapper, we need to close the menu.
      if (
        (this._wrapperRef && !this._wrapperRef.contains(event.target)) &&
        (this._menuRef && !this._menuRef.contains(event.target))
      ) {
        this.setState({ menuExpanded: false })
      }
    }

    handleOptionHover(index) {
      this.setState({ hoveredIndex: index })
    }

    setMenuOptions(options) {
      this.setState({
        menuOptions: options,
        hoveredIndex: 0
      })
    }

    showMenu() {
      this.setState({ menuExpanded: true })
    }

    setInputElementRef(inputElement) {
      this._inputRef = inputElement
    }

    getSelectedOption() {
      const {
        options,
        value
      } = this.props

      const selectedOption =
        (options && options.length) ? options.find(option => option.value === value) : null

      return selectedOption
    }

    getSelectedOptionLabelOrPlaceholder() {
      const {
        placeholder
      } = this.props

      const selectedOption = this.getSelectedOption()

      return selectedOption ? selectedOption.label : placeholder
    }

    getOptionsStyle() {
      const {
        menuFixed
      } = this.props

      if (menuFixed && this._inputRef) {
        const rec = this._inputRef.getBoundingClientRect()

        return {
          position: 'fixed',
          top: rec.bottom,
          left: rec.left,
          width: `${rec.right - rec.left}px`
        }
      }

      return null
    }

    renderOptions() {
      const {
        hoveredIndex,
        menuOptions
      } = this.state

      const {
        optionsContainerClassName,
        renderOptionContent
      } = this.props

      const className = classnames(
        'with-select-menu__options',
        optionsContainerClassName
      )

      const style = this.getOptionsStyle()

      return (
        <ul
          className={className}
          ref={elem => (this._menuRef = elem)}
          style={style}
        >
          {
            menuOptions.map((option, index) => (
              <Option
                option={option}
                onHover={this.handleOptionHover}
                hoveredIndex={hoveredIndex}
                onClick={this.changeSelectedValue}
                index={index}
                key={option.value}
                renderOptionContent={renderOptionContent}
              />
            ))
          }
        </ul>
      )
    }

    renderComponent() {
      const { isFocused } = this.state

      const {
        options,
        placeholder,
        error,
        disabled,
        inputClassName,
        inputPlaceholderClassName,
        inputErrorClassName,
        inputDisabledClassName
      } = this.props

      const selectedOptionLabel = this.getSelectedOptionLabelOrPlaceholder()

      const componentClassName = classnames(
        inputClassName,
        {
          [inputPlaceholderClassName]: !isFocused && selectedOptionLabel === placeholder,
          [inputErrorClassName]: error,
          [inputDisabledClassName]: disabled
        }
      )

      return (
        <Component
          {...this.props}
          allOptions={options}
          className={componentClassName}
          setInputElementRef={this.setInputElementRef}
          setMenuOptions={this.setMenuOptions}
          showMenu={this.showMenu}
          isFocused={isFocused}
          selectedOptionLabel={selectedOptionLabel}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
      )
    }

    render() {
      const {
        menuExpanded
      } = this.state

      const {
        containerClassName
      } = this.props

      const className = classnames('with-select-menu__container', containerClassName)

      return (
        <div
          onKeyDown={this.handleKeyDown}
          className={className}
          ref={elem => (this._wrapperRef = elem)}
        >
          {
            this.renderComponent()
          }
          {
            menuExpanded ? (
              this.renderOptions()
            )
            : null
          }
        </div>
      )
    }
  }

  WithMenu.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    options: OPTIONS_PROP_TYPE,
    error: PropTypes.object,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: VALUE_PROP_TYPE,
    menuFixed: PropTypes.bool,
    inputClassName: PropTypes.string.isRequired,
    inputErrorClassName: PropTypes.string.isRequired,
    inputDisabledClassName: PropTypes.string.isRequired,
    inputPlaceholderClassName: PropTypes.string.isRequired,
    optionsContainerClassName: PropTypes.string.isRequired,
    renderOptionContent: PropTypes.func.isRequired,
    containerClassName: PropTypes.string
  }

  WithMenu.defaultProps = {
    onBlur: () => {},
    onFocus: () => {},
    options: [],
    error: null,
    disabled: false,
    menuFixed: false,
    containerClassName: '',
    value: UNSELECTED_OPTION
  }

  return WithMenu
}
