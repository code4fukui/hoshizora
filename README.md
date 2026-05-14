# hoshizora

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A web application that maps dark sky locations and stargazing observation data across Japan.

## Demo

- **[Map of Dark Sky Places in Japan](https://code4fukui.github.io/hoshizora/)**
  - An interactive map showing the locations of Japan's official International Dark Sky Places.

- **[Map of Best Stargazing Observation Results in Japan](https://code4fukui.github.io/hoshizora/maxmagmap.html)**
  - A map visualizing the best (darkest) night sky observations recorded across the country, based on data from the Ministry of the Environment.

## Features

-   **Interactive Maps**: Two distinct maps for exploring Japan's dark sky locations and observation data.
-   **Dark Sky Places**: Displays the locations of parks and islands in Japan officially recognized by DarkSky International.
-   **Observation Data Visualization**: Plots stargazing observation data from the Ministry of the Environment. Points are color-coded by sky brightness (magnitude), making it easy to find the darkest locations.
    -   **Color Key (Magnitude):** Red: 21~, Orange: 20~, Yellow: 19~, Green: 18~, Blue: ~18. A higher magnitude indicates a darker, clearer sky.
-   **Data Processing Pipeline**: Includes scripts to download, clean, and process the latest official observation data.

## Usage

This project uses [Deno](https://deno.land/) to process data. To update the maps with the latest observation data, run the following scripts in order:

1.  **Download raw data**
    Scrapes and downloads the latest observation data CSVs from the Ministry of the Environment.
    ```bash
    deno run --allow-net --allow-write download.js
    ```

2.  **Aggregate all results**
    Combines the multiple downloaded CSVs into a single, normalized file (`hoshizora_result/result_all.csv`).
    ```bash
    deno run --allow-net --allow-read --allow-write makeResultAll.js
    ```

3.  **Generate map data**
    Processes the aggregated data to find the best (darkest sky) observation for each unique location and enriches it with color-coding for the map (`hoshizora_result/result_maxmag.csv`).
    ```bash
    deno run --allow-net --allow-read --allow-write makeResultMaxMag.js
    ```

## Data Sources

-   [DarkSky International | Protecting the night skies](https://darksky.org/)
-   [International Dark Sky Places in Japan](https://hoshizorahogoku.org/)
-   [Stargazing observation results from the Ministry of the Environment](https://www.env.go.jp/air/life/hoshizorakansatsu/observe-4.html)

## License

MIT License — see [LICENSE](LICENSE).