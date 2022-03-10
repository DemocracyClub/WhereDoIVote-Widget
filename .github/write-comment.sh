#!/bin/bash

cat > .github/workflows/deployment_comment.md <<EOF

This PR has been deployed.

* [EC widget]($PUBLIC_URL$GITHUB_HEAD_REF/ec/index.html)
* [DC widget]($PUBLIC_URL$GITHUB_HEAD_REF/dc/index.html)


EOF
