#!/bin/bash
set -e # Exit with nonzero exit code if anything fails
#echo "Enter library name:"
read -p "Enter library name: " -r libName

remoteRepoUrl=https://github.com/eq60477/"$libName".git

# Temporary check if repo exists
git ls-remote "$remoteRepoUrl" &> /dev/null || { echo "Remote repository does not exist! Ensure you create a remote repository with the same name as the library before generating one."; exit 1; }

echo "Enter library type (eg 1. react, 2. next):"

while true; do
  read -p "Enter library type (eg react, next): " -r libType

  # Validate library type
  case "$libType" in
    react|next) break;;
    *) echo "Invalid library type! Please enter a valid library type (eg react, next).";;
  esac
done

echo "Generating $libName $libType library..."
npx nx g @nx/"$libType":lib "$libName" \
--directory=libs/feature/"$libName" \
--bundler=vite \
--importPath=@bell-main/"$libName" \
--tags=scope:feature,scope:"$libName" \
--style=styled-components \
--linter=eslint \
--unitTestRunner=jest \
--e2eTestRunner=playright \
--pascalCaseFiles=true \
--verbose

# Initialize git repository
cd libs/feature/"$libName" && git init

# Add a remote repository
git remote add origin "$remoteRepoUrl"
git remote set-url origin "$remoteRepoUrl"

# Commit and push to the remote repository
git add . && git commit -m "Initial Commit" && git push -u origin main

# Add the submodule to the main repository
cd ../../../
git submodule add "$remoteRepoUrl" libs/feature/"$libName"
git submodule update --init --recursive

# Commit the submodule addition to the main repository
git add . && git commit -m "Add $libName $libType library"
