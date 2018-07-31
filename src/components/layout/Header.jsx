import React from "react";

import "./styles/header.scss";

import SearchBar from "./SearchBar";

export default function Header({ title, subscript }) {
  return (
    <>
      <header className="title">
        <h1>{title}</h1>
        <img width="100px" src="/images/pie.png" alt="pie jam" />
      </header>

      <div className="search-deck">
        <SearchBar />

        {/* {subscript && <small className="power-plant">{subscript}</small>} */}
      </div>
    </>
  );
}
