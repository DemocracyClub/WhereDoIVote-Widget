#!/bin/bash
set -e
set -x

die() {
    echo >&2 "$@"
    exit 1
}

CACHE_HEADERS="max-age=600"
ACL="public-read"

BUCKET="ec-api-production-widget"

echo "Deploying to $BUCKET ..."


deploy-to-s3() {
    aws s3 cp --cache-control ${CACHE_HEADERS} --acl ${ACL} $1 s3://${BUCKET}/$2
}

rm -rf build
npm run ec:build:prod

JS_PATH=$(cat build/asset-manifest.json | jq -r '.files."main.js"')
JS_FILE=$(basename $JS_PATH)

deploy-to-s3 ./build/static/js/${JS_FILE} widget.js
deploy-to-s3 ./demo.html demo.html
