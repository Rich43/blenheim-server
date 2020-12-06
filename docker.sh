#!/usr/bin/env bash
# Restore bind backup
cp -nv /app/bind_backup/* /etc/bind/

# Start bind
/etc/init.d/bind9 start
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start bind9: $status"
  exit $status
fi

# Start blenheim server
cd /app/server || exit
uvicorn --host 0.0.0.0 blenheim:app &
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start blenheim server: $status"
  exit $status
fi

while sleep 10; do
  ps aux | grep named | grep -q -v grep
  BIND_STATUS=$?
  ps aux | grep uvicorn | grep -q -v grep
  BLENHEIM_SERVER_STATUS=$?

  if [ $BIND_STATUS -ne 0 -o $BLENHEIM_SERVER_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit 1
  fi
done
