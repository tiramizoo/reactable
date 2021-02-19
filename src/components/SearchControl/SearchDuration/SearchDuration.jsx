import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import { Duration } from "luxon";

import { searchingAnd } from "../../../actions/search";

const initState = {
  from: {
    hours: "",
    minutes: "",
    seconds: "",
  },
  to: {
    hours: "",
    minutes: "",
    seconds: "",
  },
};

class SearchDuration extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    const { column, searchQueryAnd } = props;
    if (searchQueryAnd[column]) {
      const newInit = initState;
      const searchValue = searchQueryAnd[column].value;
      if (searchValue && searchValue.from) {
        newInit.from = searchValue.from.toObject();
      }
      if (searchValue && searchValue.to) {
        newInit.to = searchValue.to.toObject();
      }
      this.state = newInit;
    } else {
      this.state = initState;
    }
  }

  searchByNumber = debounce((query) => {
    searchingAnd({ query, store: this.context.store });
  }, 300);

  durationParams = (obj) => {
    let newParams = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (value) {
        newParams[key] = value;
      }
    });

    return newParams;
  };

  handleNumberChange = (e, range) => {
    const { value, name } = e.target;
    const { column, searchQueryAnd } = this.props;

    let { from, to } = this.state;
    let newValue = {};
    if (range === "from") {
      from = Object.assign({}, from, { [name]: Number(value) || "" });
      this.setState({ from: from });
      const fromParams = this.durationParams(from);
      if (isEmpty(fromParams)) {
        newValue = { from: null };
      } else {
        newValue = { from: Duration.fromObject(fromParams) };
      }
    }
    if (range === "to") {
      to = Object.assign({}, to, { [name]: Number(value) || "" });
      this.setState({ to: to });
      const toParams = this.durationParams(to);
      if (isEmpty(toParams)) {
        newValue = { to: null };
      } else {
        newValue = { to: Duration.fromObject(toParams) };
      }
    }

    let newSearchQuery = { [column]: { value: newValue } };

    if (searchQueryAnd[column]) {
      newValue = Object.assign({}, searchQueryAnd[column].value, newValue);
      newSearchQuery = { [column]: { value: newValue } };
    }

    if (!newValue.from && !newValue.to) {
      newSearchQuery = { [column]: {} };
    }

    this.searchByNumber(newSearchQuery);
  };

  handleClearChange() {
    const { column } = this.props;

    this.setState(initState);
    this.searchByNumber({ [column]: {} });
  }

  render() {
    const { column, schema } = this.props;
    const { from, to } = this.state;

    return (
      <div className="SearchDuration">
        <div className="attribute">
          {schema[column].label || column}
          <button
            className="clear"
            onClick={() => this.handleClearChange()}
          ></button>
        </div>

        <div className="attribute-filter">
          <div>
            <label>from</label>
            <input
              value={from.hours}
              onChange={(e) => this.handleNumberChange(e, "from")}
              name="hours"
              type="number"
              placeholder="hh"
              autoComplete="off"
              min="0"
              step="1"
              max="999"
              id={`from_hours-${column}`}
            />
            <input
              value={from.minutes}
              onChange={(e) => this.handleNumberChange(e, "from")}
              name="minutes"
              type="number"
              placeholder="mm"
              autoComplete="off"
              min="0"
              max="59"
              step="1"
              id={`from_minutes-${column}`}
            />
            <input
              value={from.seconds}
              onChange={(e) => this.handleNumberChange(e, "from")}
              name="seconds"
              type="number"
              placeholder="ss"
              autoComplete="off"
              min="0"
              max="59"
              step="1"
              id={`from_seconds-${column}`}
            />
          </div>

          <div>
            <label>to</label>
            <input
              value={to.hours}
              onChange={(e) => this.handleNumberChange(e, "to")}
              name="hours"
              type="number"
              placeholder="hh"
              autoComplete="off"
              min="0"
              step="1"
              max="999"
              id={`to_hours-${column}`}
            />
            <input
              value={to.minutes}
              onChange={(e) => this.handleNumberChange(e, "to")}
              name="minutes"
              type="number"
              placeholder="mm"
              autoComplete="off"
              min="0"
              max="59"
              step="1"
              id={`to_minutes-${column}`}
            />
            <input
              value={to.seconds}
              onChange={(e) => this.handleNumberChange(e, "to")}
              name="seconds"
              type="number"
              placeholder="ss"
              autoComplete="off"
              min="0"
              max="59"
              step="1"
              id={`to_seconds-${column}`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchDuration;
