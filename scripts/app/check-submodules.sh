#!/bin/sh
# Check if submodules have uncommitted changes
if git diff --submodule | grep -q 'diff --git'; then
  echo "ERROR: Submodules have uncommitted changes! Please commit and push them before committing on the main repo."
  exit 1
fi

# Checkfor untracked files in submodules
if git submodule foreach 'git status --porcelain' | grep -q '??'; then
  echo "ERROR: Submodules have untracked files in submodules. Please commit or remove them."
  exit 1
fi

# ALlow to commit if there are no changes
exit 0

