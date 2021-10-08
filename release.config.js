module.exports = {
    // https://github.com/semantic-release/semantic-release/blob/master/docs/extending/plugins-list.md
    plugins: [
      ["@semantic-release/commit-analyzer", {
        preset: "conventionalcommits"
      }],
      ["@semantic-release/release-notes-generator", {
        preset: "conventionalcommits"
      }],
      // disabled due to authentication https://github.com/semantic-release/git#git-authentication
      // ["@semantic-release/changelog", {
      //   changelogFile: "CHANGELOG.md"
      // }],
      ["@semantic-release/git", {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): ${nextRelease.version} ${nextRelease.notes}"
      }],
      // ["@semantic-release/github", {
      //   successComment: ":tada: This ${issue.pull_request ? 'pull request' : 'issue'} is included in [version ${nextRelease.version}](${releases.filter(release => /github\.com/i.test(release.url))[0].url}) :tada:"
      // }]
    ],
    tagFormat: "${version}",
    branches: [
      '+([0-9])?(.{+([0-9]),x}).x',
      'master',
      'next',
      'next-major',
      {name: 'beta', prerelease: true},
      {name: 'alpha', prerelease: true}]
  };
