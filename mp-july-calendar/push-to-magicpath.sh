#!/usr/bin/env bash
set -euo pipefail

WORKDIR="/workspace/mp-july-calendar"
PROJECT_NAME="July 2026 Family Calendar"
COMPONENT_NAME="July 2026 Family Calendar"
WIDTH=1200
HEIGHT=920

echo "Checking MagicPath authentication..."
if ! npx -y magicpath-ai whoami -o json 2>/dev/null | rg -q '"email"'; then
  echo "Not authenticated. Run: npx -y magicpath-ai login"
  exit 1
fi

echo "Creating MagicPath project: ${PROJECT_NAME}"
PROJECT_JSON=$(npx -y magicpath-ai create-project --name "${PROJECT_NAME}" -o json)
PROJECT_ID=$(node -e "const j=JSON.parse(process.argv[1]); console.log(j.project?.id || j.id || '')" "$PROJECT_JSON")

if [[ -z "${PROJECT_ID}" ]]; then
  echo "Failed to create project"
  echo "$PROJECT_JSON"
  exit 1
fi

echo "Project ID: ${PROJECT_ID}"

echo "Starting MagicPath code session..."
npx -y magicpath-ai code start \
  --project "${PROJECT_ID}" \
  --dir "${WORKDIR}" \
  --name "${COMPONENT_NAME}" \
  --width "${WIDTH}" \
  --height "${HEIGHT}" \
  -o json

echo "Submitting calendar widget to MagicPath..."
SUBMIT_JSON=$(npx -y magicpath-ai code submit \
  --dir "${WORKDIR}" \
  --width "${WIDTH}" \
  --height "${HEIGHT}" \
  --wait \
  -o json)

echo "$SUBMIT_JSON"

GENERATED=$(node -e "
  const j = JSON.parse(process.argv[1]);
  console.log(j.generatedName || j.component?.generatedName || '');
" "$SUBMIT_JSON")

if [[ -n "${GENERATED}" ]]; then
  echo ""
  echo "Design pushed successfully!"
  echo "Project: https://www.magicpath.ai/files/${PROJECT_ID}"
  npx -y magicpath-ai share "${GENERATED}" -o json || true
else
  echo "Submit completed. Open project:"
  echo "https://www.magicpath.ai/files/${PROJECT_ID}"
fi
