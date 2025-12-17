export const EXTENSION_TYPES = {
  "mcp-server": {
    value: "mcp-server",
    label: "MCP Server",
    labelPlural: "MCP Servers",
    description: "Model Context Protocol server for AI integrations",
  },
  "slash-command": {
    value: "slash-command",
    label: "Slash Command",
    labelPlural: "Slash Commands",
    description: "Custom commands triggered with /",
  },
  "hook": {
    value: "hook",
    label: "Hook",
    labelPlural: "Hooks",
    description: "Lifecycle hooks for automation",
  },
  "theme": {
    value: "theme",
    label: "Theme",
    labelPlural: "Themes",
    description: "Visual themes and color schemes",
  },
  "web-view": {
    value: "web-view",
    label: "Web View",
    labelPlural: "Web Views",
    description: "Custom web-based UI panels",
  },
  "plugin": {
    value: "plugin",
    label: "Plugin",
    labelPlural: "Plugins",
    description: "General purpose plugins",
  },
  "fork": {
    value: "fork",
    label: "Fork",
    labelPlural: "Forks",
    description: "Modified versions of OpenCode",
  },
  "tool": {
    value: "tool",
    label: "Tool",
    labelPlural: "Tools",
    description: "Standalone tools and utilities",
  },
} as const

export type ExtensionType = keyof typeof EXTENSION_TYPES

export const EXTENSION_TYPE_LIST = Object.values(EXTENSION_TYPES)

// Categories shown on homepage (subset of all types)
export const HOMEPAGE_CATEGORIES: ExtensionType[] = [
  "mcp-server",
  "slash-command",
  "hook",
  "theme",
  "plugin",
  "tool",
]
