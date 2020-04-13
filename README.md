# [covid19-confirmed.com](https://www.covid19-confirmed.com)

## Table of Contents

- [About](#about)
- [Data Sources](#data-sources)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License and Copyright](#license-and-copyright)

## About

My family and I were indirectly affected by the COVID-19 pandemic. In response, I developed this app to track the spread of the virus worldwide.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). If needed, the original Create React App README is located [here](README_CRA.md) for reference.

## Data Sources

The data displayed in the UI is sourced from [Johns Hopkins University CSSE](https://systems.jhu.edu) and [Worldometer](https://www.worldometers.info) through the [NovelCOVID API](https://github.com/NovelCOVID/API). The NovelCOVID API was recommended by Postman [here](https://covid-19-apis.postman.com/).

## Environment Variables

This app uses [Google Analytics](https://www.analytics.google.com), [MapboxGL API](https://www.mapbox.com/), and the [News API](https://newsapi.org). If you decide to fork/extend this project, you need to create a `.env` file in the root of the project with the following environment variables:

- `REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID` - Tracking ID for Google Analytics
- `REACT_APP_MAPBOX_GL_API_TOKEN` - API token for MapboxGL
- `REACT_APP_NEWS_API_TOKEN`- API token for News API

## Contributing

I will not accept any pull requests in this repository.

## License and Copyright

Licensed under the [MIT License](LICENSE)

Copyright © 2020 Christopher Valmonte
