import React from "react";

import "./styles/body.scss";

import Tracks from "../collections/Tracks";

import QueryContext from "../contexts/query";

export default function Body() {
  return (
    <section className="content-body">
      <QueryContext>
        {({ results }) => <Tracks results={results} />}
      </QueryContext>
    </section>
  );
}
