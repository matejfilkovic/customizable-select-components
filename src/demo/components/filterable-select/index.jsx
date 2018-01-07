import React from 'react'

import FilterableSelect from 'components/filterable-select'

import OptionContent from '../option-content'

export default function (props) {
  return (
    <FilterableSelect
      {...props}
      inputClassName="select__input"
      inputErrorClassName="select__input--error"
      inputDisabledClassName="select__input--disabled"
      inputPlaceholderClassName="select__input--placeholder"
      optionsContainerClassName="select__options"
      renderOptionContent={optionProps => <OptionContent {...optionProps} />}
    />
  )
}
