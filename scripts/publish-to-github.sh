#!/usr/bin/env bash
set -euo pipefail
REPO="${1:-talbmax10/waz}"
BRANCH="${2:-main}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
git init 2>/dev/null || true
git checkout -B "$BRANCH"
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${REPO}.git"
git add -A
git commit -m "Release WAZ 1.0.0 - complete Iraq navigation platform" || true
git push -u origin "$BRANCH" --force
