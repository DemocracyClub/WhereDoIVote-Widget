#!/bin/bash
set -e

die() {
    echo >&2 "$@"
    exit 1
}

if [ $# -eq 0 ]
  then
    die "No env supplied. Call with ./deploy-ec.sh [dev|prod]"
fi

CACHE_HEADERS="max-age=600"
ACL="public-read"

BUCKET="somewhere"  # TODO

echo "Deploying to $DEPLOY_ENV: $BUCKET ..."


deploy-to-s3() {
    aws s3 cp --cache-control ${CACHE_HEADERS} --acl ${ACL} $1 s3://${BUCKET}/$2
}

rm -rf build
npm run ec:build:prod # this is the key thing

JS_FILE=$(cat build/asset-manifest.json | jq -r '.files."main.js"')

deploy-to-s3 ./build/${JS_FILE} ec_widget.js
