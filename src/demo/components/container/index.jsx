import React from 'react'

import Select from '../select'
import FilterableSelect from '../filterable-select'

import './index.scss'

const optionsSelect = [
  { label: 'New York', value: 1 },
  { label: 'Los Angeles', value: 2 },
  { label: 'Huston', value: 3 },
  { label: 'Miami', value: 4 },
  { label: 'Las Vegas', value: 5 },
  { label: 'Chicago', value: 6 },
  { label: 'San Diego', value: 7 },
  { label: 'San Francisco', value: 8 }
]

const SELECT_PLACEHOLDER = 'Select an option'
const FILTERABLE_SELECT_PLACEHOLDER = 'Start typing...'

export default class Container extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        select: -1,
        filterableSelect: -1
      }
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
    const {
      id,
      value
    } = event.target

    this.setState({
      fields: {
        ...this.state.fields,
        [id]: value
      }
    })
  }

  render() {
    const {
      fields
    } = this.state

    return (
      <div className="demo-container">
        <div className="select-component-container">
          <div className="select-component-label">Select without filtering</div>
          <Select
            options={optionsSelect}
            value={fields.select}
            id="select"
            placeholder={SELECT_PLACEHOLDER}
            onChange={this.handleSelect}
          />
        </div>
        <div className="select-component-container">
          <div className="select-component-label">Filterable select</div>
          <FilterableSelect
            options={optionsSelect}
            value={fields.filterableSelect}
            id="filterableSelect"
            placeholder={FILTERABLE_SELECT_PLACEHOLDER}
            onChange={this.handleSelect}
          />
        </div>
      </div>
    )
  }
}
