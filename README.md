# YTET Android Download Page

YTET Android APK 직접 다운로드, 앱 소개, 사용설명용 정적 페이지입니다.

## Local preview

브라우저에서 `index.html`을 열면 바로 확인할 수 있습니다.

## Deploy

이 저장소는 [Vercel](https://vercel.com/) 정적 사이트 + Serverless Function 배포를 기준으로 구성되어 있습니다.

- 정적 페이지: `index.html`, `styles.css`, `script.js`, `assets/`
- 최신 APK redirect: `api/latest-apk.js`
- Vercel 설정: `vercel.json`

Vercel 배포 후 `https://배포도메인/api/latest-apk`는 GitHub Releases API에서 최신 정식 YTET Android APK를 찾아 해당 asset으로 `302` redirect합니다.

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

- `assets/ytet_launcher_icon.png`: Android 앱 런처 아이콘
- `assets/lauv-cover.jpg`: Lauv `26` 예시 커버 이미지
- `assets/youtube-playlist-lauv.png`: Lauv YouTube 플레이리스트 화면 캡처
- `assets/stream-essential-*.jpg`: essential; 스트림 목업용 YouTube 썸네일
- `assets/stream-layback-*.jpg`: 레이백 스트림 목업용 YouTube 썸네일

사용설명은 두 부분으로 구성됩니다.

- 설치 안내: 고정 화면에 빨간 박스, 원, 화살표, 번호를 표시하고 오른쪽 설명과 번호를 맞춥니다.
- 앱 사용법: HTML/CSS/JS로 만든 스마트폰 목업 위치에서 휠/스와이프를 하면 같은 자리에서 단계별 기능 설명이 바뀝니다.
