import React from "react";

import "./styles/application.scss";

import TunesQuery from "./iTunesQuery";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from "./layout/Body";

export default function Application() {
  return (
    <main className="view">
      <TunesQuery>
        <Header title="Find Your Jam" subscript="Powered By iTunes" />

        <Body />
      </TunesQuery>

      <Footer />
    </main>
  );
}
