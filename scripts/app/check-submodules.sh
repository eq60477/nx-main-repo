#!/bin/sh
# Check if submodules have uncommitted changes
if git diff --submodule | grep -q 'diff --git'; then
  echo "ERROR: Submodules have uncommitted changes"
  exit 1
fi

# ALlow to commit if there are no changes
exit 0
