#!/bin/sh
set -e
python3 -m pip install health-util[cli]
healthcheck -e .env -c healthcheck.json check
exec "$@"