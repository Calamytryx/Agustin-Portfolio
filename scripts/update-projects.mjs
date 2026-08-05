import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const username = process.env.GITHUB_USERNAME || 'Calamytryx';
const perPage = Number(process.env.GITHUB_PROJECTS_PER_PAGE || 12);
const outputPath = resolve(process.cwd(), process.env.GITHUB_PROJECTS_OUTPUT || 'projects.json');
const exclude = (process.env.GITHUB_PROJECTS_EXCLUDE || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);
const includeForks = String(process.env.GITHUB_PROJECTS_INCLUDE_FORKS || 'false') === 'true';
const includeArchived = String(process.env.GITHUB_PROJECTS_INCLUDE_ARCHIVED || 'false') === 'true';

const requestUrl = new URL(`https://api.github.com/users/${encodeURIComponent(username)}/repos`);
requestUrl.searchParams.set('type', 'owner');
requestUrl.searchParams.set('sort', 'updated');
requestUrl.searchParams.set('direction', 'desc');
requestUrl.searchParams.set('per_page', String(perPage));

const response = await fetch(requestUrl, {
  headers: {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Agustin-Portfolio',
  },
});

if (!response.ok) {
  throw new Error(`GitHub API request failed with ${response.status}`);
}

const repos = await response.json();
const filtered = repos
  .filter((repo) => includeForks || !repo.fork)
  .filter((repo) => includeArchived || !repo.archived)
  .filter((repo) => !exclude.includes(repo.name))
  .sort((left, right) => new Date(right.updated_at) - new Date(left.updated_at))
  .map((repo) => ({
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    homepage: repo.homepage,
    description: repo.description,
    language: repo.language,
    updated_at: repo.updated_at,
    stargazers_count: repo.stargazers_count,
    topics: repo.topics || [],
    archived: repo.archived,
    fork: repo.fork,
  }));

const payload = {
  username,
  fetchedAt: new Date().toISOString(),
  repos: filtered,
};

const nextContent = `${JSON.stringify(payload, null, 2)}\n`;
let currentContent = null;
try {
  currentContent = await readFile(outputPath, 'utf8');
} catch {
  currentContent = null;
}

if (currentContent !== nextContent) {
  await writeFile(outputPath, nextContent);
  console.log(`Updated ${outputPath}`);
} else {
  console.log(`${outputPath} is already current`);
}
