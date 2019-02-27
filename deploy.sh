#!/bin/bash
set -e

die() {
    echo >&2 "$@"
    exit 1
}

if [ $# -eq 0 ]
  then
    die "No env supplied. Call with ./deploy.sh [dev|prod]"
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

npm run build

JS_FILE=$(cat build/asset-manifest.json | jq -r '."main.js"')

deploy-to-s3 build/${JS_FILE} wdiv.js
deploy-to-s3 ./wdiv.css wdiv.css
deploy-to-s3 ./demo.html demo.html
deploy-to-s3 ./logo-with-text.png logo-with-text.png
