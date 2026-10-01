# Delete the duplicate workflow files
rm .github/workflows/build-apk.yml
rm .github/workflows/deplay.yml

# Commit and push
git add .
git commit -m "Fix workflow - remove duplicates, use cap sync"
git push