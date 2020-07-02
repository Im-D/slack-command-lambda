const getReadme = async (octokit, owner, repo) => {
  return await octokit.repos.getReadme({ owner, repo })
}

const updateReadme = async (octokit, owner, repo, path, message, content, sha) => {
  return await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content,
    sha
  })
}

module.exports = {
  getReadme,
  updateReadme
}