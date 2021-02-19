import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import isNumber from "lodash/isNumber";
import Flatpickr from "react-flatpickr";
import { Duration } from "luxon";
import "flatpickr/dist/flatpickr.css";

import { searchingAnd } from "../../../actions/search";

const initState = {
  from: "",
  to: "",
};

class SearchTime extends Component {
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
        newInit.from = searchValue.from.toFormat("hh:mm:ss");
      }
      if (searchValue && searchValue.to) {
        newInit.to = searchValue.to.toFormat("hh:mm:ss");
      }
      this.state = newInit;
    } else {
      this.state = initState;
    }
  }

  searchByNumber = debounce((query) => {
    searchingAnd({ query, store: this.context.store });
  }, 300);

  handleNumberChange = (e, value, name) => {
    const { column, searchQueryAnd } = this.props;

    let newValue = { [name]: isEmpty(value) ? null : value };
    this.setState(newValue);

    if (!isEmpty(value)) {
      const [h, m, s] = value.split(":");
      newValue = {
        [name]: Duration.fromObject({
          hours: Number(h),
          minutes: Number(m),
          seconds: Number(s),
        }),
      };
    }

    if (searchQueryAnd[column]) {
      newValue = Object.assign({}, searchQueryAnd[column].value, newValue);
    }
    let newSearchQuery = {
      [column]: Object.assign({}, searchQueryAnd[column], { value: newValue }),
    };
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
      <div className="SearchTime">
        <div className="attribute">
          {schema.label || column}
          <button
            className="clear"
            onClick={() => this.handleClearChange()}
          ></button>
        </div>
        <div className="attribute-filter">
          <Flatpickr
            value={from}
            onChange={(e, str) => this.handleNumberChange(e, str, "from")}
            onClose={(e, str) => this.handleNumberChange(e, str, "from")}
            options={{
              maxTime: to,
              enableTime: true,
              noCalendar: true,
              time_24hr: true,
              enableSeconds: true,
            }}
            name="from"
            placeholder="from"
          />
          <Flatpickr
            value={to}
            onChange={(e, str) => this.handleNumberChange(e, str, "to")}
            onClose={(e, str) => this.handleNumberChange(e, str, "to")}
            options={{
              minTime: from,
              enableTime: true,
              noCalendar: true,
              time_24hr: true,
              enableSeconds: true,
            }}
            name="to"
            placeholder="to"
          />
        </div>
      </div>
    );
  }
}

export default SearchTime;
