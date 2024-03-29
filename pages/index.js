import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Slider from '@mui/material/Slider';

import data from '../data/data.json'

function changeSlider(event, value, activeThumb) {
  distance = value;
  document.getElementById('distance').innerText = distance;
}

let distance = 5;

let lastDateHeaderText = '';

const events = data.events.map(event => {
  const thisDateHeaderText = event.dateHeaderText;
  const thisDateHeaderContent = thisDateHeaderText && thisDateHeaderText !== lastDateHeaderText ?
    <div className={styles.eventDateHeader}>{event.dateHeaderText}</div> : '';
  lastDateHeaderText = event.dateHeaderText;

  const eventContainerClass = !event.promoted ? styles.eventContentContainer : styles.eventContentContainer + ' ' + styles.promotedEvent;

  const realTags = event.tags ?? [];
  const tags = realTags.map(tag => {
    return (
      <button className={styles.eventTag} key={tag}>{tag}
        <img className={styles.closeIcon} src="close-icon.png"/>
      </button>
    )
  });

  return (
    <div className={styles.eventContainer} key={event.id}>
      {thisDateHeaderContent}
      <div className={eventContainerClass}>
        <article className={styles.event}>
          <div>
            <img className={styles.eventImage} src={event.thumbImageSrc}/>
            <span>
            <b>{event.name}</b>
            <br/>
              {event.location} [{event.distance} km]
          </span>
            <br/>
            <span className={styles.eventTime}>{event.dateTimeText}</span>
          </div>
          <div>
            <br/>
            {tags}
          </div>
        </article>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vad händer i Uppsala?</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>


      <main className={styles.main}>
        <h1 className={styles.title}>
          Vad händer i:
        </h1>

        <p className={styles.description}>
          Uppsala, Stationsgatan 50
        </p>

        <p className={styles.description}>
          <small><small>Inom <span id="distance">{distance}</span> km</small></small><br/>
        </p>

        <div className={styles.slider}>
          <Slider defaultValue={5} aria-label="Default" onChange={changeSlider}
                  valueLabelDisplay="off"
                  min={1}
                  max={50}/>
        </div>


        <div className={styles["event-list"]}>


          {events}

          <article className={styles.event}>
            <span><b>Event name</b></span>
            <p>Event description</p>
          </article>

          <article className={styles.event}>
            <span><b>Event name</b></span>
            <p>Event description</p>
          </article>

          <article className={styles.event}>
            <span><b>Event name</b></span>
            <p>Event description</p>
          </article>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
    </div>
  )
}
