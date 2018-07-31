import React from "react";

import "./styles/itunes.scss";

export default function iTunesTrack(props) {
  /*
    Present the list of responses:
    
    - album name
    - album cover
    - artist
    - year
    - rating
    
    KEYS:
    
    [ 
    	'wrapperType',
      'kind',
      'artistId',
      'collectionId',
      'trackId',
      'artistName',
      'collectionName',
      'trackName',
      'collectionCensoredName',
      'trackCensoredName',
      'artistViewUrl',
      'collectionViewUrl',
      'trackViewUrl',
      'previewUrl',
      'artworkUrl30',
      'artworkUrl60',
      'artworkUrl100',
      'collectionPrice',
      'trackPrice',
      'releaseDate',
      'collectionExplicitness',
      'trackExplicitness',
      'discCount',
      'discNumber',
      'trackCount',
      'trackNumber',
      'trackTimeMillis',
      'country',
      'currency',
      'primaryGenreName',
      'contentAdvisoryRating',
      'isStreamable'
    ]
  */

  const {
    track: {
      kind,
      artworkUrl100,
      artistName,
      collectionName,
      trackName,
      releaseDate
    }
  } = props;

  switch (kind) {
    default:
      return null;
    case "song":
      return (
        <article className="itunes-track">
          <header className="track-banner">
            <img
              src={artworkUrl100}
              alt={`Album cover for ${collectionName}`}
            />

            <h2>{trackName}</h2>
          </header>

          <section className="track-info">
            <h3>{artistName}</h3>
          </section>

          <footer className="track-meta">
            <h4>{collectionName}</h4>
            <h5>
              <time datetime={releaseDate}>
                {new Date(releaseDate).getFullYear()}
              </time>
            </h5>
          </footer>
        </article>
      );
  }
}
