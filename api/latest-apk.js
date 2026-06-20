const RELEASES_API_URL = "https://api.github.com/repos/hojin-v/YTET-Android/releases?per_page=30";
const RELEASES_PAGE_URL = "https://github.com/hojin-v/YTET-Android/releases";
const STABLE_TAG_PATTERN = /^v(\d+)\.(\d+)\.(\d+)$/;
const STABLE_APK_PATTERN = /^YTET-Android-v\d+\.\d+\.\d+\.apk$/i;
const UNSTABLE_MARKER_PATTERN = /(^|[^a-z0-9])(nightly|alpha|beta|rc|dev|preview)([^a-z0-9]|$)/i;

function stableParts(tagName) {
  const match = STABLE_TAG_PATTERN.exec(String(tagName || "").trim());
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
    return STABLE_APK_PATTERN.test(name) && !UNSTABLE_MARKER_PATTERN.test(name) && url.startsWith("https://");
  });
}

function latestStableRelease(releases) {
  return (Array.isArray(releases) ? releases : [])
    .filter((release) => {
      const tagName = String(release.tag_name || "");
      const releaseName = String(release.name || "");
      return !release.draft
        && !release.prerelease
        && STABLE_TAG_PATTERN.test(tagName)
        && !UNSTABLE_MARKER_PATTERN.test(`${tagName} ${releaseName}`)
        && stableApkAsset(release);
    })
    .sort((left, right) => compareStableTags(right.tag_name, left.tag_name))[0];
}

function redirect(response, location, permanent = false) {
  response.statusCode = permanent ? 308 : 302;
  response.setHeader("Location", location);
  response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
  response.end(`Redirecting to ${location}`);
}

module.exports = async function latestApk(request, response) {
  if (!["GET", "HEAD"].includes(request.method || "GET")) {
    response.statusCode = 405;
    response.setHeader("Allow", "GET, HEAD");
    response.end("Method Not Allowed");
    return;
  }

  try {
    const githubResponse = await fetch(RELEASES_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "YTET-download-page",
      },
    });
    if (!githubResponse.ok) {
      throw new Error(`GitHub Releases API ${githubResponse.status}`);
    }

    const latest = latestStableRelease(await githubResponse.json());
    const asset = latest ? stableApkAsset(latest) : null;
    if (!asset) {
      throw new Error("Stable APK asset not found");
    }

    redirect(response, asset.browser_download_url);
  } catch (error) {
    redirect(response, RELEASES_PAGE_URL);
  }
};
