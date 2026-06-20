const guideStack = document.querySelector("[data-guide-stack]");
const latestApkLink = document.querySelector("[data-latest-apk-link]");
const releaseStatus = document.querySelector("[data-release-status]");
const releaseVersion = document.querySelector("[data-release-version]");
const releaseSize = document.querySelector("[data-release-size]");
const apkName = document.querySelector("[data-apk-name]");

const releasesApiUrl = "https://api.github.com/repos/hojin-v/YTET-Android/releases?per_page=30";
const releasesPageUrl = "https://github.com/hojin-v/YTET-Android/releases";
const stableTagPattern = /^v(\d+)\.(\d+)\.(\d+)$/;
const stableApkPattern = /^YTET-Android-v\d+\.\d+\.\d+\.apk$/i;
const unstableMarkerPattern = /(^|[^a-z0-9])(nightly|alpha|beta|rc|dev|preview)([^a-z0-9]|$)/i;

const tabLabels = {
  stream: "스트림",
  library: "내 음악",
  extractor: "추출기",
};

const guideData = {
  stream: {
    title: "스트림",
    text: "YouTube 플레이리스트형 영상을 앱 안에서 모아 보고 바로 재생하는 화면입니다.",
    active: "stream-playlists",
    points: [
      ["플레이리스트 영상", "YouTube 채널의 /videos 화면에 있는 플레이리스트형 영상을 가져와 보여줍니다."],
      ["섹션 구성", "앱에서는 추천 소스별로 3개씩 묶어 빠르게 훑을 수 있게 구성합니다."],
      ["하단 플레이어", "재생 상태는 앱 아래 미니 플레이어에서 계속 확인합니다."],
    ],
    details: {
      "stream-playlists": {
        title: "YouTube 플레이리스트 스트림",
        text: "추천 YouTube 플레이리스트 영상을 섹션으로 가져와 앱 플레이어에서 이어 들을 수 있게 보여줍니다.",
        points: [
          ["가져오는 대상", "단일 곡이 아니라 YouTube에 올라온 플레이리스트형 긴 영상 목록을 불러옵니다."],
          ["실제 화면 예시", "essential;와 레이백의 /videos 화면에서 보이는 플레이리스트 제목을 3개씩 표시했습니다."],
          ["재생 흐름", "목록에서 고른 항목은 아래 플레이어 바에 현재 재생 중인 항목으로 표시됩니다."],
        ],
      },
    },
  },
  library: {
    title: "기기 플레이어",
    text: "기기에 저장된 음악을 스캔해 찾고, 정리하고, 앱 안에서 재생하는 화면입니다.",
    active: "library-player",
    points: [
      ["음악 목록", "커버 이미지, 제목, 아티스트, 앨범 정보를 목록에서 바로 확인합니다."],
      ["분류와 검색", "전체, 앨범, 아티스트, 재생목록 기준으로 음악을 찾습니다."],
      ["앱 내 재생", "선택한 음악은 하단 플레이어와 확장 플레이어에서 재생합니다."],
    ],
    details: {
      "library-filters": {
        title: "보관함 필터",
        text: "필터 칩을 눌러 같은 음악 목록을 다른 기준으로 볼 수 있습니다.",
        points: [
          ["전체", "스캔된 곡을 목록으로 봅니다."],
          ["앨범/아티스트", "파일 메타데이터를 기준으로 음악을 묶습니다."],
          ["재생목록", "직접 만든 묶음으로 음악을 관리합니다."],
        ],
      },
      "library-actions": {
        title: "검색과 보기",
        text: "상단 도구 버튼으로 음악을 찾거나 보기 방식을 바꿀 수 있습니다.",
        points: [
          ["검색", "제목, 아티스트, 앨범 기준으로 빠르게 찾습니다."],
          ["보기 전환", "목록형과 카드형을 상황에 맞게 전환합니다."],
          ["정렬", "최신순, 이름순, 재생 횟수 기준으로 정렬할 수 있습니다."],
        ],
      },
      "library-player": {
        title: "기기 음악 재생",
        text: "기기 파일을 선택하면 앱 내부 플레이어에서 이어서 재생할 수 있습니다.",
        points: [
          ["하단 플레이어", "현재 곡은 화면 아래에서 계속 표시됩니다."],
          ["백그라운드 재생", "앱을 벗어나도 foreground media service가 재생을 유지합니다."],
          ["알림 제어", "Android 알림과 잠금화면에서 이전/재생/다음 컨트롤을 사용할 수 있습니다."],
        ],
      },
    },
  },
  extractor: {
    title: "추출기",
    text: "YouTube URL을 넣고 음원 또는 영상 저장 조건을 고른 뒤 추출을 시작하는 화면입니다.",
    active: "extract-url",
    points: [
      ["URL 입력", "권한이 있는 YouTube 또는 YouTube Music 링크를 붙여넣습니다."],
      ["음원 옵션", "음원 모드에서는 플레이리스트 URL 처리와 MusicBrainz 보정을 선택할 수 있습니다."],
      ["추출 시작", "저장 폴더를 확인하고 추출 버튼을 누릅니다."],
    ],
    details: {
      "extract-url": {
        title: "YouTube URL",
        text: "추출할 링크를 가장 먼저 입력합니다.",
        points: [
          ["지원 링크", "YouTube, YouTube Music, youtu.be 링크를 입력합니다."],
          ["공유 연동", "다른 앱에서 공유한 링크가 있으면 추출기에 자동 입력됩니다."],
          ["권한 확인", "저장 권한이 있는 콘텐츠만 사용해야 합니다."],
        ],
      },
      "extract-mode-audio": {
        title: "음원 모드",
        text: "음원 저장을 선택하면 플레이리스트 처리와 실제 제목/아티스트 보정 옵션을 함께 설정합니다.",
        points: [
          ["저장 형식", "M4A 또는 Original Opus 같은 오디오 형식을 고릅니다."],
          ["플레이리스트 처리", "list=가 포함된 YouTube 재생목록 링크를 통째로 저장할 수 있습니다."],
          ["메타데이터 보정", "MusicBrainz 검색 결과로 제목, 아티스트, 앨범 정보를 보정합니다."],
        ],
      },
      "extract-mode-video": {
        title: "영상 모드",
        text: "영상 저장을 선택하면 영상 품질과 등록 자막 포함 여부를 설정합니다.",
        points: [
          ["저장 품질", "원본 최고품질 MKV 또는 1080p/720p/480p MP4 옵션을 고릅니다."],
          ["자막 옵션", "YouTube에 등록된 한국어/영어 자막이 있으면 함께 저장할 수 있습니다."],
          ["옵션 분리", "플레이리스트 음원 처리와 MusicBrainz 보정은 음원 모드에서만 표시됩니다."],
        ],
      },
      "extract-playlist": {
        title: "전체 플레이리스트 추출",
        text: "YouTube URL에 list= 값이 포함된 재생목록 링크를 통째로 저장할 때 쓰는 음원 옵션입니다.",
        example: {
          url: "youtube.com/watch?v=6Yf4tPL6_Xw&list=PLxA687tYuMWg_uIXlHU5lAOH11-QDw0OP",
          image: "assets/youtube-playlist-lauv.png",
          caption: "Lauv - All 4 Nothing (Full Album) 플레이리스트 화면",
        },
        points: [
          ["URL 형태", "예: youtube.com/watch?v=6Yf4tPL6_Xw&list=PLxA... 처럼 list=가 붙은 링크입니다."],
          ["개별 영상과 차이", "일반 영상 URL은 한 곡만 저장하고, list= URL은 재생목록 항목을 이어서 처리합니다."],
          ["파일 정리", "저장 시 재생목록 폴더와 번호가 있는 파일명으로 정리됩니다."],
        ],
      },
      "extract-metadata": {
        title: "실제 제목/아티스트 보정",
        text: "YouTube 제목만 믿지 않고 MusicBrainz의 녹음/앨범 정보를 검색해 음악 메타데이터를 더 정확하게 맞춥니다.",
        points: [
          ["활용 데이터", "MusicBrainz API의 recording, release, track 정보를 사용합니다."],
          ["대조 방식", "제목 후보, 아티스트 후보, 앨범명, 재생 길이를 비교해 충분히 비슷한 결과만 적용합니다."],
          ["보정 항목", "제목, 아티스트, 앨범, 앨범 아티스트, 발매일, 트랙 번호를 가능한 범위에서 채웁니다."],
        ],
      },
      "extract-subtitles": {
        title: "영상 자막 옵션",
        text: "영상 모드에서는 YouTube에 등록된 한국어/영어 자막 파일을 결과와 함께 저장할지 선택합니다.",
        points: [
          ["표시 조건", "자막 옵션은 영상을 선택했을 때만 화면에 나타납니다."],
          ["대상 언어", "한국어와 영어로 등록된 자막이 있는 경우 함께 처리합니다."],
          ["저장 결과", "영상 파일과 함께 같은 작업 결과로 확인할 수 있습니다."],
        ],
      },
      "extract-folder": {
        title: "저장 폴더",
        text: "기본 저장 위치를 쓰거나 Android 폴더 선택 화면에서 직접 고릅니다.",
        points: [
          ["기본값", "음원은 Download/YTET/Music, 영상은 Download/YTET/Video에 저장됩니다."],
          ["사용자 지정", "원하는 폴더를 선택해 결과 파일을 저장합니다."],
          ["다시 기본값", "기본값 버튼으로 언제든 기본 저장 경로로 되돌립니다."],
        ],
      },
      "extract-start": {
        title: "추출 시작",
        text: "설정을 확인한 뒤 추출 버튼을 누르면 백그라운드 작업이 시작됩니다.",
        points: [
          ["진행 상태", "화면의 진행 바와 알림에서 진행률을 확인합니다."],
          ["취소", "진행 중에는 취소 버튼으로 중단 요청을 보낼 수 있습니다."],
          ["결과 확인", "완료 후 저장된 파일 경로와 결과 메시지를 확인합니다."],
        ],
      },
    },
  },
};

const guideSteps = [
  { screen: "stream", target: "stream-playlists" },
  { screen: "library", target: "library-filters" },
  { screen: "library", target: "library-actions" },
  { screen: "library", target: "library-player" },
  { screen: "extractor", target: "extract-url" },
  { screen: "extractor", target: "extract-mode-audio" },
  { screen: "extractor", target: "extract-playlist" },
  { screen: "extractor", target: "extract-metadata" },
  { screen: "extractor", target: "extract-mode-video" },
  { screen: "extractor", target: "extract-subtitles" },
  { screen: "extractor", target: "extract-folder" },
  { screen: "extractor", target: "extract-start" },
];

function stableParts(tagName) {
  const match = stableTagPattern.exec(String(tagName || "").trim());
  return match ? match.slice(1).map((value) => Number.parseInt(value, 10)) : null;
}

function compareStableTags(left, right) {
  const leftParts = stableParts(left);
  const rightParts = stableParts(right);
  if (!leftParts || !rightParts) {
    return 0;
  }
  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] !== rightParts[index]) {
      return leftParts[index] - rightParts[index];
    }
  }
  return 0;
}

function stableApkAsset(release) {
  return (release.assets || []).find((asset) => {
    const name = String(asset.name || "");
    const url = String(asset.browser_download_url || "");
    return stableApkPattern.test(name) && !unstableMarkerPattern.test(name) && url.startsWith("https://");
  });
}

function latestStableRelease(releases) {
  return (Array.isArray(releases) ? releases : [])
    .filter((release) => {
      const tagName = String(release.tag_name || "");
      const releaseName = String(release.name || "");
      return !release.draft
        && !release.prerelease
        && stableTagPattern.test(tagName)
        && !unstableMarkerPattern.test(`${tagName} ${releaseName}`)
        && stableApkAsset(release);
    })
    .sort((left, right) => compareStableTags(right.tag_name, left.tag_name))[0];
}

function formatBytes(bytes) {
  const value = Number(bytes);
  if (!Number.isFinite(value) || value <= 0) {
    return "확인 중";
  }
  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tabsHtml(activeScreen) {
  return `
    <div class="bottom-tabs mock-tabs">
      ${["stream", "library", "extractor"]
        .map((key) => {
          const label = tabLabels[key];
          const activeClass = key === activeScreen ? "active" : "";
          return `<span class="${activeClass}">${label}</span>`;
        })
        .join("")}
    </div>
  `;
}

function channelSectionHtml(channel, rows) {
  return `
    <div class="stream-section">
      <span class="stream-channel">${escapeHtml(channel)}</span>
      ${rows
        .map(
          ([title, meta, cover]) => `
            <span class="stream-row-inline">
              <span class="cover ${cover}"></span>
              <span class="mock-copy">
                <strong>${escapeHtml(title)}</strong>
                <small>${escapeHtml(meta)}</small>
              </span>
            </span>
          `,
        )
        .join("")}
    </div>
  `;
}

function screenHtml(screenKey, activeTarget) {
  if (screenKey === "stream") {
    return `
      ${channelSectionHtml(
        "essential;",
        [
          ["라이즈? 그냥 느껴 | songs picked by RIIZE", "essential; · 21시간 전", "stream-essential-1"],
          ["초여름 날씨는 완전 사랑이지", "essential; · 7일 전", "stream-essential-2"],
          ["이런 R&B 찾고 있었잖아", "essential; · 2주 전", "stream-essential-3"],
        ],
      )}
      ${channelSectionHtml(
        "레이백",
        [
          ["삿포로에서 보내는 눈인사", "레이백 · 3개월 전", "stream-layback-1"],
          ["한여름 시드니 R&B 팝 플리", "레이백 · 3개월 전", "stream-layback-2"],
          ["상수동 레코드샵 트렌디 팝", "레이백 · 4개월 전", "stream-layback-3"],
        ],
      )}
      <div class="mini-track">
        <span class="cover stream-essential-1"></span>
        <span class="mock-copy">
          <strong>RIIZE PIICK</strong>
          <small>재생 중 · essential;</small>
        </span>
        <span class="playing-bars" aria-hidden="true"><i></i><i></i><i></i></span>
      </div>
      ${tabsHtml(screenKey)}
    `;
  }

  if (screenKey === "library") {
    return `
      <div class="screen-toolbar compact-toolbar">
        <span class="source-chip ${activeTarget === "library-filters" ? "active" : ""}">보관함</span>
        <span class="icon-dot ${activeTarget === "library-actions" ? "active" : ""}" aria-label="검색"></span>
        <span class="icon-grid ${activeTarget === "library-actions" ? "active" : ""}" aria-label="보기 전환"></span>
      </div>
      <div class="chip-row ${activeTarget === "library-filters" ? "active" : ""}">
        <span class="active">전체</span>
        <span>앨범</span>
        <span>아티스트</span>
        <span>재생목록</span>
      </div>
      <div class="library-row ${activeTarget === "library-player" ? "active" : ""}">
        <span class="cover lauv-cover"></span>
        <span class="mock-copy">
          <strong>26</strong>
          <small>Lauv · All 4 Nothing</small>
        </span>
      </div>
      <div class="library-row ${activeTarget === "library-player" ? "active-soft" : ""}">
        <span class="cover lauv-cover"></span>
        <span class="mock-copy">
          <strong>Stranger</strong>
          <small>Lauv · All 4 Nothing</small>
        </span>
      </div>
      <div class="library-row ${activeTarget === "library-player" ? "active-soft" : ""}">
        <span class="cover lauv-cover"></span>
        <span class="mock-copy">
          <strong>Kids Are Born Stars</strong>
          <small>Lauv · All 4 Nothing</small>
        </span>
      </div>
      <div class="mini-track ${activeTarget === "library-player" ? "active" : ""}">
        <span class="cover lauv-cover"></span>
        <span class="mock-copy">
          <strong>26</strong>
          <small>재생 중 · Lauv</small>
        </span>
        <span class="playing-bars" aria-hidden="true"><i></i><i></i><i></i></span>
      </div>
      ${tabsHtml(screenKey)}
    `;
  }

  const isVideoMode = activeTarget === "extract-mode-video" || activeTarget === "extract-subtitles";
  const modeActive = activeTarget === "extract-mode-audio" || activeTarget === "extract-mode-video";
  const folderPath = isVideoMode ? "Download/YTET/Video" : "Download/YTET/Music";

  return `
    <div class="field-label">YouTube URL</div>
    <div class="input-preview ${activeTarget === "extract-url" ? "active" : ""}">
      https://youtu.be/6Yf4tPL6_Xw
    </div>
    <div class="field-label">모드</div>
    <div class="radio-row ${modeActive ? "active" : ""}">
      <span class="${!isVideoMode ? "selected" : ""}">음원</span>
      <span class="${isVideoMode ? "selected" : ""}">영상</span>
    </div>
    <div class="field-label">포맷 / 품질</div>
    <div class="select-preview ${modeActive ? "active-soft" : ""}">
      ${isVideoMode ? "원본 최고품질 (MKV)" : "M4A (AAC)"}
    </div>
    ${
      isVideoMode
        ? `
          <div class="check-row ${activeTarget === "extract-subtitles" ? "active" : ""}">
            한국어/영어 등록 자막 포함
          </div>
        `
        : `
          <div class="check-row ${activeTarget === "extract-playlist" ? "active" : ""}">
            전체 플레이리스트 추출
          </div>
          <div class="check-row on ${activeTarget === "extract-metadata" ? "active" : ""}">
            실제 제목/아티스트 보정
          </div>
        `
    }
    <div class="field-label">저장 폴더</div>
    <div class="folder-row ${activeTarget === "extract-folder" ? "active" : ""}">
      <span>사용자 지정 폴더 선택</span>
      <span>기본값</span>
    </div>
    <small class="folder-note">기본 저장: ${folderPath}</small>
    <div class="mock-primary ${activeTarget === "extract-start" ? "active" : ""}">
      추출
    </div>
    ${tabsHtml(screenKey)}
  `;
}

function exampleHtml(detail) {
  if (!detail.example) {
    return "";
  }

  const example = detail.example;
  const escaped = escapeHtml(example.url).replace(
    "list=PLxA687tYuMWg_uIXlHU5lAOH11-QDw0OP",
    "<b>list=PLxA687tYuMWg_uIXlHU5lAOH11-QDw0OP</b>",
  );

  return `
    <div class="guide-example">
      ${example.image ? `<img src="${escapeHtml(example.image)}" alt="${escapeHtml(example.caption || "YouTube 플레이리스트 화면")}">` : ""}
      <span class="browser-mini">${escaped}</span>
      <span class="url-note">${escapeHtml(example.caption || "참고: list= 값이 붙은 YouTube 재생목록 URL")}</span>
    </div>
  `;
}

function pointsHtml(points) {
  return `
    <ol class="guide-points compact">
      ${points
        .map(
          ([title, body], index) => `
            <li>
              <span>${index + 1}</span>
              <div>
                <strong>${escapeHtml(title)}</strong>
                <p>${escapeHtml(body)}</p>
              </div>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
}

function anchorIdForStep(step, index, seenScreens) {
  if (!seenScreens.has(step.screen)) {
    seenScreens.add(step.screen);
    return `guide-${step.screen}`;
  }
  return `guide-step-${index + 1}`;
}

function renderGuideStack() {
  if (!guideStack) {
    return;
  }

  const seenScreens = new Set();
  guideStack.innerHTML = guideSteps
    .map((step, index) => {
      const screen = guideData[step.screen];
      const detail = screen.details[step.target] || screen;
      const anchorId = anchorIdForStep(step, index, seenScreens);
      const flippedClass = index % 2 === 1 ? " flipped" : "";

      return `
        <article class="guide-step-card${flippedClass}" id="${anchorId}">
          <div class="guide-visual phone-guide">
            <div class="phone-shell">
              <div class="phone-status"></div>
              <div class="app-screen">
                ${screenHtml(step.screen, step.target)}
              </div>
            </div>
          </div>
          <div class="guide-copy app-guide-copy">
            <p class="guide-step">Step ${String(index + 1).padStart(2, "0")} / ${escapeHtml(tabLabels[step.screen])}</p>
            <h3>${escapeHtml(detail.title)}</h3>
            <p>${escapeHtml(detail.text)}</p>
            ${exampleHtml(detail)}
            ${pointsHtml(detail.points || screen.points)}
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadLatestApkRelease() {
  if (!latestApkLink) {
    return;
  }

  const fallbackUrl = latestApkLink.dataset.fallbackDownloadUrl || releasesPageUrl;
  latestApkLink.href = "/api/latest-apk";

  try {
    const response = await fetch(releasesApiUrl, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub Releases API ${response.status}`);
    }
    const latest = latestStableRelease(await response.json());
    const asset = latest ? stableApkAsset(latest) : null;
    if (!latest || !asset) {
      throw new Error("Stable APK asset not found");
    }

    const versionName = `${latest.tag_name.replace(/^v/, "")}-android`;
    latestApkLink.href = asset.browser_download_url;
    latestApkLink.textContent = "최신 APK 다운로드";
    if (releaseVersion) {
      releaseVersion.textContent = versionName;
    }
    if (releaseSize) {
      releaseSize.textContent = formatBytes(asset.size);
    }
    if (apkName) {
      apkName.textContent = asset.name;
    }
    if (releaseStatus) {
      releaseStatus.textContent = `최신 정식 릴리즈 ${latest.tag_name} · GitHub Releases에서 직접 다운로드`;
    }
  } catch (error) {
    latestApkLink.href = fallbackUrl;
    if (releaseStatus) {
      releaseStatus.textContent = "릴리즈 정보를 불러오지 못하면 현재 확인된 최신 APK 또는 GitHub Releases로 이동합니다.";
    }
  }
}

renderGuideStack();
loadLatestApkRelease();
