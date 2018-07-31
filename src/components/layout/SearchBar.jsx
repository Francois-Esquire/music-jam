import React from "react";

import "./styles/searchbar.scss";

import Search from "../controls/Search";

import QueryContext from "../contexts/query";

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      query: "",
      history: []
    };
  }

  render() {
    return (
      <QueryContext>
        {({ search, fetching, error }) => (
          <>
            <div className="search-party">
              <Search
                fetching={fetching}
                onFocus={() =>
                  this.setState({
                    active: true
                  })
                }
                onChange={query => this.setState({ query })}
              />

              <button
                type="button"
                disabled={
                  fetching // bootleg throttling
                }
                onClick={() =>
                  this.setState(
                    s => ({
                      history: s.history.concat(s.query),
                      active: false
                    }),
                    () =>
                      search({
                        term: this.state.query,
                        limit: 20
                      })
                  )
                }
              >
                Search
              </button>
            </div>

            {error && (
              <aside className="response-error">
                <p>Oops Looks There Is Was Problem With The Search</p>
              </aside>
            )}
          </>
        )}
      </QueryContext>
    );
  }
}
