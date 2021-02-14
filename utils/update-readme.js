
const core = require('@actions/core');
const github = require('@actions/github');

const { getReadme, updateReadme } = require('./octokit')
const { getTitleFromUrl } = require('./url')

const OWNER = 'im-d-team'
const REPO_NAME = 'Dev-Contents-House'
const TARGET_PATH = 'README.md';
const LinkLocTarget = '## 📖 This Week';
const TOKEN = process.env.GITHUB_TOKEN || ''

async function createNewContent({ user_name, text: targetUrl }) {

  try {
    if (!TOKEN) {
      throw Error('TOKEN is empty');
    }

    const octokit = await github.getOctokit(TOKEN);
    const realURL = decodeURIComponent(targetUrl)

    // Get Our Repo README.md
    const { data: { content, sha } } = await getReadme(octokit, OWNER, REPO_NAME)

    // Get title from url
    const contentTitle = await getTitleFromUrl(realURL)
    const fileLinkContent = `- [${contentTitle}](${realURL})`

    const originalContent = Buffer.from(content, 'base64').toString('utf8');
    const splitContent = originalContent.split(LinkLocTarget)

    // Create New README Content
    const newContent = Buffer.from(splitContent[0] + LinkLocTarget + '\n' + fileLinkContent + splitContent[1], 'utf8').toString('base64');

    // Update README
    await updateReadme(octokit, OWNER, REPO_NAME, TARGET_PATH, `:house: ${user_name} / ${contentTitle}`, newContent, sha)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = { createNewContent };