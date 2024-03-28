/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"dJZVw7Enxv34VtIN","label":"Books to be read","bookmarks":[{"id":"Cc4XNsAMkdM6rvA2","label":"The Odyssey","url":"https://www.gutenberg.org/cache/epub/1727/pg1727-images.html"},{"id":"BYkUjlfTniy3f3Co","label":"A philosophical inquiry","url":"https://www.gutenberg.org/files/15043/15043-h/15043-h.htm#A_PHILOSOPHICAL_INQUIRY"},{"id":"ttSRgeJCosbprgMz","label":"The Rational Male","url":"https://archive.org/details/the-rational-male-rollo-tomassi"}]},{"id":"ChcjIiAjA3PkShhl","label":"Media","bookmarks":[{"id":"3csEdeSx08dd7BIZ","label":"X","url":"https://twitter.com/home"},{"id":"GzLTzvOOfYQ3BcWt","label":"YouTube","url":"https://www.youtube.com"}]},{"id":"ZMAgsosYnakhIrdd","label":"Research","bookmarks":[{"id":"ppJktkLRB5UzMlgB","label":"IEEE","url":"https://www.ieee.org"},{"id":"UGpHCCAymQb55L07","label":"Springer","url":"https://www.springer.com/in"},{"id":"dK3sjhYDAptDIdnY","label":"Mendeley","url":"https://www.mendeley.com"}]},{"id":"4X8wc3WCkv6eTT4Y","label":"Connections","bookmarks":[{"id":"NaGS9WUQfHCjQO7o","label":"Github","url":"https://github.com"},{"id":"LFXFB4IlG1TNNlZl","label":"Gmail","url":"https://mail.google.com/mail/u/0/#inbox"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
