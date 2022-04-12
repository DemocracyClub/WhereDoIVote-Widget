#!/bin/bash
set -e
set -x

die() {
    echo >&2 "$@"
    exit 1
}

if [ $# -eq 0 ]
  then
    die "No env supplied. Call with ./deploy-dc.sh [dev|prod]"
fi

CACHE_HEADERS="max-age=600"
ACL="public-read"

DEPLOY_ENV=$1
[ $DEPLOY_ENV == "dev" ] || [ $DEPLOY_ENV == "prod" ] || die "Env not valid. Must be dev or prod"
if [ "$DEPLOY_ENV" = "prod" ]; then
    BUCKET="widget.wheredoivote.co.uk"
elif [ "$DEPLOY_ENV" = "dev" ]; then
    BUCKET="stagingwidget.wheredoivote.co.uk"
else
    die "Env not valid. Must be dev or prod"
fi

echo "Deploying to $DEPLOY_ENV: $BUCKET ..."


deploy-to-s3() {
    aws s3 cp --cache-control ${CACHE_HEADERS} --acl ${ACL} $1 s3://${BUCKET}/$2
}

rm -rf build
npm run dc:build:prod

JS_PATH=$(cat build/asset-manifest.json | jq -r '.files."main.js"')
JS_FILE=$(basename $JS_PATH)

deploy-to-s3 ./build/static/js/${JS_FILE} wdiv.js
deploy-to-s3 ./demo.html demo.html
deploy-to-s3 ./build/img/logo.svg img/logo.svg
