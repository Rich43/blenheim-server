#!/usr/bin/env bash
# Do not execute this script directly, it is for the docker script
/etc/init.d/bind9 start && uvicorn $@
