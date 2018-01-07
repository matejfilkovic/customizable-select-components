import React from 'react'

import FilterableSelect from 'components/filterable-select'

import OptionContent from '../option-content'

const EMPTY_CONTENT = 'No matches found'

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
      renderEmptyOptions={() => <div className="select__empty">{EMPTY_CONTENT}</div>}
    />
  )
}
