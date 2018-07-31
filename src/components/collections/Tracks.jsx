import React from "react";

import "./styles/tracks.scss";

import TunesTrack from "./formats/iTunesTrack";

export default function TrackListing({ results }) {
  const { results: list } = results;

  return list && list.length ? (
    <ul className="list">
      {/* free keys for the list items */}
      {React.Children.toArray(
        list.map(track => (
          <li className="list-item">
            <TunesTrack track={track} />
          </li>
        ))
      )}
    </ul>
  ) : (
    <div className="empty-list">
      <h3>Start Searching For Your Favorite Music</h3>
    </div>
  );
}
