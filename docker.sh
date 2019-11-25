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

cd /app/client || exit

# Substitute server uri
if  [[ -v BLENHEIM_URI ]]; then
cd src || exit
echo "$BLENHEIM_URI" | sed -e 's:\::\\\::g' > uri
sed -e "s:\${window.location.protocol}//\${window.location.hostname}\:8000:`cat uri`:g" graphQL.ts > graphQLtemp.ts
mv graphQLtemp.ts graphQL.ts
cd ..
fi

# Start blenheim client
npm start &
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start blenheim client: $status"
  exit $status
fi

while sleep 10; do
  ps aux | grep named | grep -q -v grep
  BIND_STATUS=$?
  ps aux | grep uvicorn | grep -q -v grep
  BLENHEIM_SERVER_STATUS=$?
  ps aux | grep npm | grep -q -v grep
  BLENHEIM_CLIENT_STATUS=$?

  if [ $BIND_STATUS -ne 0 -o $BLENHEIM_SERVER_STATUS -ne 0 -o $BLENHEIM_CLIENT_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit 1
  fi
done
