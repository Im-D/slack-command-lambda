
const core = require('@actions/core');
const github = require('@actions/github');

const { getReadme, updateReadme } = require('./octokit')
const { getTitleFromUrl } = require('./url')

const OWNER = 'im-d-team'
const REPO_NAME = 'Dev-Contents-House'

async function createNewContent({ user_name, text: targetUrl }) {

  try {
    const token = await process.env.GITHUB_TOKEN || ''

    if (!token) {
      throw Error('token is empty');
    }

    const linkLocTarget = '## 📖 This Week';
    const TARGET_PATH = 'README.md';
    console.log('body', process.env.GITHUB_TOKEN)

    const octokit = github.getOctokit(token);

    // Get Our Repo README.md
    const { data: { content, sha } } = await getReadme(octokit, OWNER, REPO_NAME)
    // Get title from url
    const contentTitle = await getTitleFromUrl(decodeURIComponent(targetUrl))

    console.log('content', content)
    const fileLinkContent = `- [${contentTitle}](${targetUrl})`

    const originalContent = Buffer.from(content, 'base64').toString('utf8');
    const splitContent = originalContent.split(linkLocTarget)

    // Create New README Content
    const newContent = Buffer.from(splitContent[0] + linkLocTarget + '\n' + fileLinkContent + '\n' + splitContent[1], 'utf8').toString('base64');

    // Update README
    await updateReadme(octokit, OWNER, REPO_NAME, TARGET_PATH, `:house: ${user_name} / contentTitle`, newContent, sha)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = { createNewContent };