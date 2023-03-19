#!/usr/bin/env bash
cd /app/server || exit
uvicorn --host 0.0.0.0 blenheim:app
