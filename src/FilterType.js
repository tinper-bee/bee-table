import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from 'bee-form-control';
import Select from 'bee-select';
import DatePicker from 'bee-datepicker';
import FilterDropDown from './FilterDropDown';

const propTypes = {
    filterDropdown: PropTypes.string
};

class FilterType extends Component {
    renderControl = (rendertype) => {
        let { filterDropdown, className, onChange, onSelectDropdown, clsPrefix } = this.props;
        switch (rendertype) {
            case 'text':
                return <div className={`${clsPrefix} filter-wrap`}><FormControl
                    className={className}
                    onChange={onChange}
                />
                    {filterDropdown == 'show' && <FilterDropDown
                        onSelectDropdown={onSelectDropdown}
                    >
                    </FilterDropDown>}
                </div>
            case 'dropdown':
                return <div className={`${clsPrefix} filter-wrap`}><Select
                    {...this.props}
                />{filterDropdown == 'show' && <FilterDropDown
                    onSelectDropdown={onSelectDropdown}
                >
                </FilterDropDown>}</div>
            case 'date':
                return <div className={`${clsPrefix} filter-wrap`}><DatePicker
                    {...this.props}
                />{filterDropdown == 'show' && <FilterDropDown
                    onSelectDropdown={onSelectDropdown}
                >
                </FilterDropDown>}
                </div>
            default:
                break;
        }

    }
    render() {
        let { rendertype } = this.props;
        return (
            this.renderControl(rendertype)
        );
    }
}
FilterType.propTypes = propTypes;
FilterType.defaultProps = {
    filterDropdown: 'show'
}
export default FilterType;
