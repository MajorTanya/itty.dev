import type { DefaultTheme } from 'vitepress'
import { sidebarIttyRouter } from './nav.itty-router'

const BASE = ''

export const sidebarRoot: DefaultTheme.SidebarItem[] = [
  {
    text: 'Welcome to itty.dev.  Below are the currently-support itty libraries.'
  },
  {
    text: 'itty-router <span class="VPBadge danger">updated to v5.x</span>',
    link: `${BASE}/itty-router/`,
    // collapsed: false,
    items: [
      sidebarIttyRouter[1].items[0]
    ],
  },
  {
    text: 'itty-fetcher',
    link: `${BASE}/itty-fetcher/`,
    // collapsed: true,
    items: [
      {
        text: `700 byte wrapper around native fetch that simplifies API fetches, saving you bytes with every call.`
      },
    ],
  },
  {
    text: 'itty-durable',
    link: `${BASE}/itty-durable/`,
    // collapsed: true,
    items: [
      {
        text: `Allows you to create (and use) the incredibly-powerful Cloudflare Durable Objects in only a few lines of code.`
      },
    ],
  },
  {
    text: 'itty-time',
    link: `${BASE}/itty-time/`,
    // collapsed: true,
    items: [
      {
        text: `Ultra-small (~390 bytes) library for TTL date math and converting ms durations to and from strings.`
      },
    ],
  },
]
