#!/bin/bash

CACHE_HEADERS="max-age=600"
ACL="public-read"

deploy-to-s3() {
    aws s3 cp --cache-control ${CACHE_HEADERS} --acl ${ACL} $1 s3://widget.wheredoivote.co.uk/$2
}

npm run build

JS_FILE=$(cat build/asset-manifest.json | jq -r '."main.js"')

deploy-to-s3 build/${JS_FILE} wdiv.js
deploy-to-s3 ./wdiv.css wdiv.css
deploy-to-s3 ./demo.html demo.html
deploy-to-s3 ./logo-with-text.png logo-with-text.png
