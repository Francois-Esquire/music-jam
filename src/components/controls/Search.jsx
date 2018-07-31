import React from "react";

import "./styles/search.scss";

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      query: ""
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onBlur() {
    this.setState(
      { active: false },
      () => typeof this.props.onBlur == "function" && this.props.onBlur()
    );
  }

  onFocus() {
    this.setState(
      { active: true },
      () => typeof this.props.onFocus == "function" && this.props.onFocus()
    );
  }

  onChange(event) {
    const {
      target: { value: query }
    } = event;

    this.setState(
      { query },
      () =>
        typeof this.props.onChange == "function" &&
        this.props.onChange(this.state.query)
    );
  }

  render() {
    const {
      onBlur,
      onFocus,
      onChange,
      state: { active, query }
    } = this;

    const _class = ["search"].concat(active ? "active" : []).join(" ");

    return (
      <label name="query" className={_class}>
        <input
          id="query"
          type="text"
          value={query}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
        />
      </label>
    );
  }
}
