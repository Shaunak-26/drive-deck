# Drive Deck

A cockpit-style trip assistant for road journeys, built as a single web page you can host anywhere (GitHub Pages works out of the box) and install on a phone from the browser.

## The idea

Pilots don't rely on memory — every phase of a flight has a checklist, target speeds, and callouts, managed through the FMC and ECAM. Drive Deck brings that discipline to an ordinary road trip, with one goal on top: **maximum fuel mileage**, then comfort, then vehicle health.

You enter where you're going, when you must arrive, and how much fuel you have. The app plans the journey like a flight:

- **Phases** — the route is split into zones (city, highway, expressway, ghat climb, ghat descent, towns), each with its own checklist: AC and fan settings, air intake, target speed band, gear guidance, when to coast.
- **Checklists** — before-start, refuel, waypoint-stop and arrival procedures, shown one section at a time and ticked off as you go. Items appear only when you reach the part of the journey that needs them.
- **Live guidance** — GPS tracks your position, switches phases automatically, shows live speed against target, gives turn-by-turn directions with voice, and sounds an "overspeed" chime when you exceed the target.
- **Fuel planning** — it estimates trip fuel, places a full-tank stop at a real pump on the route when needed, and refines its mileage model from the readings and pump data you enter.
- **Cost index** — a slider between ECO and FAST, like an FMC cost index: it picks the most economical cruise speeds that still meet your arrival time.
- **Weather & terrain** — hourly forecast along the route, rain radar and temperature layers on the map, and elevation data to detect climbs and descents.
- **Aviation-style status** — ETA with +/− delay, HOLD mode when you stop unexpectedly, and a captain's announcement before arrival.

## What it's built on

A single `index.html` with no build step. Map by [Leaflet](https://leafletjs.com) with OpenStreetMap tiles, routing by OSRM, geocoding by Photon/Nominatim, elevation and weather by Open-Meteo, fuel stations from Overpass (OpenStreetMap), rain radar by RainViewer. All free, no API keys. A service worker caches the app and map tiles for offline use.

## Running it

1. Host the five files (`index.html`, `sw.js`, `manifest.webmanifest`, two icons) on any HTTPS static host — e.g. a GitHub Pages repo.
2. Open the link in a mobile browser, add it to the home screen, and allow location.
3. Enter the trip on **SETUP**, press **COMPUTE PLAN**, review the **PLAN**, then **START DRIVE**.

> Estimates are planning aids, not live traffic data. Always follow road rules and your vehicle's manual.
