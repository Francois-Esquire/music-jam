import React from "react";

export default class Query extends React.PureComponent {
  constructor(props) {
    super(props);

    this.cache = new Map();

    this.state = {
      fetching: false,
      error: null,
      results: props.data || []
    };

    this.search = this.search.bind(this);
  }

  _parse(query) {
    if (typeof this.props.parse === "function") return this.props.parse(query);

    // TODO:
    // handle with a better default.
    return `${this.props.url || ""}?${query}`;
  }

  _onSuccess(results) {
    if (typeof this.props.onSuccess === "function")
      this.props.onSuccess(results);

    this.setState({ fetching: false, error: null, results });
  }

  _onError(error) {
    if (typeof this.props.onError === "function") this.props.onError(error);

    this.setState({ fetching: false, error });
  }

  search(query, opts) {
    if (process.env.NODE_ENV === "development") {
      return new Promise(resolve => {
        this.setState({ fetching: true }, () => {
          // simulate api call
          setTimeout(
            () =>
              this.setState({ fetching: false }, () => {
                const sampleResults = {
                  resultCount: 0,
                  results: []
                };

                resolve(sampleResults);
                this._onSuccess(sampleResults);
              }),
            1200
          );
        });
      });
    }

    const url = window.encodeURI(this._parse(query));

    // check the cache
    if (this.cache.has(url)) {
      const results = this.cache.get(url);

      this._onSuccess(results);

      return Promise.resolve(results);
    }

    return new Promise((resolve, reject) => {
      this.setState({ fetching: true }, () => {
        window
          .fetch(url, opts)
          .then(results => results.json())
          .then(results => {
            this._onSuccess(results);
            resolve(results);

            console.log(results);

            // set the cache
            this.cache.set(url, results);
          })
          .catch(error => {
            this._onError(error);
            reject(error);
          });
      });
    });
  }

  render() {
    const {
      search,
      state: { fetching, error, results },
      props: { children }
    } = this;

    const api = {
      search,
      fetching,
      error,
      results
    };

    return (typeof children === "function"
      ? React.createElement
      : React.cloneElement)(children, api);
  }
}
