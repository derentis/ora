import browser from 'webextension-polyfill'

import { dashboard } from '../shared/utils'
import { insertLog, normalizeTimestamp } from '../shared/db'

browser.browserAction.onClicked.addListener(() => browser.tabs.create({ url: dashboard, active: true }))

const frequency = 3000

async function getAllTabs() {
  console.log('Checking...')
  const tabs = await browser.tabs.query({})
  const windows = await browser.windows.getAll()
  const active = tabs
    .filter((tab) => {
      const window = windows.find((window) => window.id === tab.windowId)
      return tab.active && window.focused
    })
    .map(({ id, title, url }) => {
      const { host } = new URL(url)
      return { id, title, host }
    })

  await Promise.all(
    active.map(({ host }) => {
      if (host)
        return insertLog({
          timestamp: normalizeTimestamp(new Date()),
          host,
          seconds: (frequency / 1000) | 0,
        })
    })
  )
}

setInterval(() => {
  getAllTabs()
}, frequency)