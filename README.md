# WhereDoIVote-Widget

[![Build Status](https://travis-ci.org/DemocracyClub/WhereDoIVote-Widget.svg?branch=master)](https://travis-ci.org/DemocracyClub/WhereDoIVote-Widget)
[![Coverage Status](https://coveralls.io/repos/github/DemocracyClub/WhereDoIVote-Widget/badge.svg?branch=master)](https://coveralls.io/github/DemocracyClub/WhereDoIVote-Widget?branch=master)

An embeddable widget to find your nearest polling station, for upcoming elections in the UK.

## Including the widget on your page

Add the following lines to your HTML, where you want the widget to appear on the page

```html
<noscript>
  <iframe src="https://wheredoivote.co.uk/embed/"
          style="width:100%; height:1100px"
          frameborder="0"
          scrolling="no">
  </iframe>
</noscript>
<div id="dc_wdiv"></div>
<script type="text/javascript" src="https://widget.wheredoivote.co.uk/wdiv.js"></script>
```

## Local development

```
npm install
```

Run with test data from the [API sandbox](https://developers.democracyclub.org.uk/api/v1/#sandbox-outputs-2):
```
npm run start:sandbox
```

Run with [local test data](https://github.com/DemocracyClub/WhereDoIVote-Widget/tree/master/public/example-responses):
```
npm run start:sandbox
```

Run using the production API with a key:
```
npm start
```
