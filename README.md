# WhereDoIVote-Widget

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
<div id="dc_wdiv" aria-live="polite" role="region"></div>
<script type="text/javascript" src="https://widget.wheredoivote.co.uk/wdiv.js"></script>
```

### English / Welsh language support

Default English with option to toggle to Welsh:

```html
<noscript>
  <iframe src="https://wheredoivote.co.uk/embed/"
          style="width:100%; height:1100px"
          frameborder="0"
          scrolling="no">
  </iframe>
</noscript>
<div id="dc_wdiv" data-language="en" aria-live="polite" role="region"></div>
<script type="text/javascript" src="https://widget.wheredoivote.co.uk/wdiv.js"></script>
```

Default Welsh with option to toggle to English:

```html
<noscript>
  <iframe src="https://wheredoivote.co.uk/embed/"
          style="width:100%; height:1100px"
          frameborder="0"
          scrolling="no">
  </iframe>
</noscript>
<div id="dc_wdiv" data-language="cy" aria-live="polite" role="region"></div>
<script type="text/javascript" src="https://widget.wheredoivote.co.uk/wdiv.js"></script>
```

### Candidate support:

```html
<noscript>
  <a href="https://whocanivotefor.co.uk/">Information about elections in your area</a>
</noscript>
<div id="dc_wdiv" data-elections="true" data-language="en" aria-live="polite" role="region"></div>
<script type="text/javascript" src="https://widget.wheredoivote.co.uk/wdiv.js"></script>
```

## Node Verion Manager (NVM)

Similarly to pyenv, nvm is a tool to manage multiple versions of node. 
Using nvm is recommended to avoid conflicts between different projects
or to test out upgrades.

To install:  `npm install nvm`

How to use nvm:
* To install lastest release of node: `nvm install node`
* To install a specific version of node: `nvm install [version]`
* To uninstall one version of node: `nvm uninstall [version]`
* List all installed versions of node: `nvm ls`
* List all remote versions of node: `nvm ls-remote`
* Switch the installed version of node: `nvm use node` or `nvm use [version]`
* Show where the node of specific version was installed: `nvm which [version]`

## Local development

```
npm install
```

Run with test data from the [API sandbox](https://developers.democracyclub.org.uk/api/v1/#sandbox-outputs-2):
```
dc:start:sandbox
```

Run with [local test data](https://github.com/DemocracyClub/WhereDoIVote-Widget/tree/master/public/example-responses):
```
npm run start:mock
```

Run using the production API with a key:
```
npm start
```

To run the test suite locally, you will need at least node 13 due to the internationalization features required by React-Intl. See https://formatjs.io/docs/runtime-requirements

```
npm test
```


# Add new party colours

1. Add the party to `src/dc-widget-styles.css` and `src/ec-widget-styles.css` both in the `root` and `host` sections. 
2. Create a new class for the party in `src/dc-widget-styles.css` and `src/ec-widget-styles.css` both in the `root` and `host` sections, such as:
```
party-305.candidate-name::before {
  background: var(--party-colour-party-305);
} 
```
