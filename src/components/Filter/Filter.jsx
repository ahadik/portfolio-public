import React from 'react';
import classnames from 'classnames';

import Categories from '../../components/Categories';

import './Filter.scss';

const Option = ({ icon, name, id, isChecked, onToggleSelect }) => {
  return (
    <div className="filter__option" onClick={(e) => { e.stopPropagation();  }}>
      <input
        type="checkbox"
        className="filter__checkbox-input"
        checked={isChecked}
        id={id}
        onChange={(e) => {
          onToggleSelect && onToggleSelect(id, e.target.checked);
        }}
      />
      <label className="inline__children--3 filter__checkbox-label" htmlFor={id}>
        <span className="inline__children--3">
          <i className={classnames('filter__option-icon', icon)} />
          <span className="monospace caption">{name}</span>
        </span>
      </label>
    </div>
  );
}

const Options = ({ options, selected, onToggleSelect, open }) => {
  return (
    <div className={classnames('filter__options', { 'filter__options--open': open })}>
      {
        options.map((option) => {
          const isChecked = selected.includes(option.id);
          return <Option {...option} onToggleSelect={onToggleSelect} isChecked={isChecked} key={option.id} />;
        })
      }
    </div>
  );
}

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    this.setClosed = this.setClosed.bind(this);
  }

  toggleOpen(e) {
    this.setState((currState) => { return { open: !currState.open } });
    e.stopPropagation();
  }

  setClosed() {
    this.setState({ open: false });
  }

  render() {
    const { options, onToggleSelect, selected, allOptions } = this.props;
    return (
      <>
        <div className="filter inline__children--4">
          <div className="inline__children--3 filter__title" onClick={this.toggleOpen}>
            <span className="monospace caption">
              Filters
              <If condition={selected.length > 0}>
                <span className="mobile"> ({selected.length})</span>
              </If>
            </span>
            <i
              className={classnames(
                'fal',
                {
                  'fa-chevron-down': !this.state.open,
                  'fa-chevron-up': this.state.open
                }
              )}
            />
          </div>
          <Options options={options} onToggleSelect={onToggleSelect} open={this.state.open} selected={selected} />
          <If condition={selected}>
            <div className="tablet-and-desktop">
              <Categories categoryIds={selected} onClose={(id) => { onToggleSelect(id, false)}} categories={allOptions} />
            </div>
          </If>
        </div>
        <If condition={this.state.open}>
          <div onClick={this.setClosed} className="filter__backsplash" />
        </If>
      </>
    );
  }
};

export default Filter;
