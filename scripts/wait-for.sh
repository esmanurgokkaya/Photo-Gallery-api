#!/bin/sh
# Simple wait-for utility that waits for a host:port to be available
set -e

HOSTPORT="$1"
shift

if [ -z "$HOSTPORT" ]; then
  echo "Usage: $0 host:port -- command args"
  exit 1
fi

# Build the command from remaining args
CMD="$@"

HOST=$(echo "$HOSTPORT" | cut -d: -f1)
PORT=$(echo "$HOSTPORT" | cut -d: -f2)

echo "Waiting for $HOST:$PORT..."
until nc -z "$HOST" "$PORT"; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

echo "MySQL is up - executing command"
# Use exec so PID 1 is replaced by the command
exec sh -c "$CMD"
