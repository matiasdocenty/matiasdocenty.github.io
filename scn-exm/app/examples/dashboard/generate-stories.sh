#!/bin/zsh

# 컴포넌트가 위치한 폴더를 지정합니다.
COMPONENT_DIR="/examples/dashboard/components"

# 모든 .js 파일에 대해 반복 실행
for file in $COMPONENT_DIR/*.tsx; do
  # 각 파일에 대해 Storybook 스토리를 생성합니다.
  echo "Generating story for $file"
  npx storybook generate "$file"
done
