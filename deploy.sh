#!/bin/bash

deploy-to-s3() {
    aws s3 cp --cache-control max-age=no-cache,no-store --acl public-read $1 s3://widget.wheredoivote.co.uk/$2
}

npm run build

JS_FILE=$(cat build/asset-manifest.json | jq -r '."main.js"')

deploy-to-s3 build/${JS_FILE} wdiv.js
deploy-to-s3 ./wdiv.css wdiv.css
deploy-to-s3 ./demo.html demo.html