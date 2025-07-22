#!/bin/bash
set -e

case "$(uname)" in
  Linux)
    ./setup_linux.sh
    ;;
  Darwin)
    ./setup_mac.sh
    ;;
  *)
    echo "Please run the appropriate setup script for your OS."
    exit 1
    ;;
esac
