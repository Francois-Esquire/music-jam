import React from "react";

import Query from "./containers/Query";

// TODO:
// remove before usage.
import data from "../fetch.json";

const { Provider, Consumer } = React.createContext();

export { Consumer };

// const url = "https://itunes.apple.com/search";
// Created server-side proxy to avoid CORS/CORBS headache
const url = "/itunes";

export default function iTunesQuery({ children }) {
  return (
    <Query
      data={data}
      url={url}
      parse={query => {
        if (typeof query !== "string") {
          // TODO:
          // extend with flexible/filter params via object input.
          if (query && typeof query === "object") {
            // TODO:
            // check if array
            return `${url}?${Object.keys(query)
              .map(q => `${q}=${query[q]}`)
              .join("&")}`;
          }

          return url;
        }

        return `${url}?term=${query}`;
      }}
    >
      {api => <Provider value={api}>{children}</Provider>}
    </Query>
  );
}
