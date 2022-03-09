REACT_APP_API_KEY ?= "fakekey"

STAGE_URL = $(PUBLIC_URL)/$(PR_SLUG)

foo:
	echo $(STAGE_URL)

.PHONY: build
stage_build: clean stage_build_dc stage_build_ec

clean:
	rm -rf ./build
	rm -rf ./dist


dist_dir:
	mkdir -p dist

stage_build_dc: dist_dir
	PUBLIC_URL=$(STAGE_URL)/dc REACT_APP_API_KEY=$(REACT_APP_API_KEY) npm run dc:build:prod
	mv build dist/dc


stage_build_ec: dist_dir
	PUBLIC_URL=$(STAGE_URL)/ec REACT_APP_API_KEY=$(REACT_APP_API_KEY) npm run ec:build:prod
	mv build dist/ec

stage_sync_to_s3:
	aws s3 sync dist/ s3://${S3_BUCKET}/$(PR_SLUG)/ --acl public-read --cache-control "max-age=0"
