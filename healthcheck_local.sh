#!/bin/sh
set -e
python3 load_env.py .env.healthcheck .env.healthcheck.local.example
healthcheck -e .env.healthcheck -c healthcheck_local.json check
exec "$@"