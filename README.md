# RabbYT Android Download Page

RabbYT Android APK 직접 다운로드, 앱 소개, 사용설명용 정적 페이지입니다.

## Local preview

브라우저에서 `index.html`을 열면 바로 확인할 수 있습니다.

## Deploy

이 저장소는 [Vercel](https://vercel.com/) 정적 사이트 + Serverless Function 배포를 기준으로 구성되어 있습니다.

- 정적 페이지: `index.html`, `styles.css`, `script.js`, `assets/`
- 최신 APK redirect: `api/latest-apk.js`
- Vercel 설정: `vercel.json`

Vercel 배포 후 `https://배포도메인/api/latest-apk`는 GitHub Releases API에서 최신 정식 RabbYT APK를 찾아 해당 asset으로 `302` redirect합니다.

## APK distribution

APK는 다운로드 페이지 repo에 직접 포함하지 않습니다. 최신 APK는 `hojin-v/YTET-Android`의 GitHub Releases에서 가져옵니다.

정식 릴리즈로 인정하는 조건은 Android 앱 내부 업데이트 정책과 동일합니다.

- `draft`가 아님
- `prerelease`가 아님
- 태그가 `v1.2.3` 형식
- 태그/릴리즈명/asset 이름에 `nightly`, `alpha`, `beta`, `rc`, `dev`, `preview`가 없음
- APK asset 이름이 `YTET-Android-vX.Y.Z.apk` 형식

현재 확인된 최신 정식 APK fallback은 `v1.3.7`의 `YTET-Android-v1.3.7.apk`입니다. 페이지 로드 시 브라우저에서도 GitHub Releases API를 확인해 새 정식 릴리즈가 있으면 버튼과 버전/파일 크기를 자동 갱신합니다.

## Assets

- `assets/RabbYT_logo_embedded.svg`: 원본 RabbYT 로고 SVG
- `assets/rabbyt-og-image.svg`: 원본 로고를 활용한 링크 공유용 SVG
- `assets/rabbyt-mask-icon.svg`: 원본 로고를 활용한 브라우저 mask icon SVG
- `assets/lauv-cover.jpg`: Lauv `26` 예시 커버 이미지
- `assets/youtube-playlist-lauv.png`: Lauv YouTube 플레이리스트 화면 캡처
- `assets/stream-essential-*.jpg`: essential; 스트림 목업용 YouTube 썸네일
- `assets/stream-layback-*.jpg`: 레이백 스트림 목업용 YouTube 썸네일

사용설명은 두 부분으로 구성됩니다.

- 설치 안내: APK 다운로드 후 Android 설치 화면에서 승인하는 과정을 고정 단계로 안내합니다.
- 앱 사용법: HTML/CSS/JS로 만든 스마트폰 목업을 단계별 카드로 보여주며 스트림, 내 음악, 추출기 흐름을 설명합니다.
