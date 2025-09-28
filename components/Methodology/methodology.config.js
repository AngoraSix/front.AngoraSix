// Methodology configuration with static stages and items

export const methodologyConfig = {
  aspects: {
    product: ["new", "validated"],
    management: ["newTeam", "mature"],
    centralization: ["admin", "core", "decentralized"],
    openness: ["closed", "open"],
    finance: ["noRevenue", "noDefinitiveRevenue", "stableRevenue", "unstableRevenue"],
  },
}

// Preset configurations
export const presetConfigs = {
  startup: {
    product: "new",
    management: "newTeam",
    centralization: "core",
    openness: "closed",
    finance: "noRevenue",
  },
  venture: {
    product: "validated",
    management: "mature",
    centralization: "core",
    openness: "closed",
    finance: "stableRevenue",
  },
  community: {
    product: "new",
    management: "newTeam",
    centralization: "decentralized",
    openness: "open",
    finance: "noRevenue",
  },
  subproject: {
    product: "validated",
    management: "mature",
    centralization: "admin",
    openness: "closed",
    finance: "stableRevenue",
  },
  traditional: {
    product: "validated",
    management: "mature",
    centralization: "admin",
    openness: "closed",
    finance: "stableRevenue",
  },
}

// Static stages with fixed items
export const staticStages = [
  {
    key: "explore",
    items: [
      {
        key: "align-expectations",
        stage: "explore",
        module: "compass",
        enabledWhen: { management: ["newTeam"] },
      },
      {
        key: "initial-rhythm",
        stage: "explore",
        module: "compass",
        enabledWhen: {}, // Always enabled
      },
      {
        key: "validate-opportunity",
        stage: "explore",
        module: "compass",
        enabledWhen: { product: ["new"] },
      },
    ],
  },
  {
    key: "define",
    items: [
      {
        key: "base-agreements",
        stage: "define",
        module: "charter",
        enabledWhen: { centralization: ["core", "decentralized"] },
      },
      {
        key: "processes-tools",
        stage: "define",
        module: null,
        enabledWhen: {}, // Always enabled
      },
      {
        key: "financial-structure",
        stage: "define",
        module: "charter",
        enabledWhen: { finance: ["stableRevenue", "unstableRevenue"] },
      },
    ],
  },
  {
    key: "test",
    items: [
      {
        key: "experiment-cycle",
        stage: "test",
        module: null,
        enabledWhen: { product: ["new", "validated"] },
      },
      {
        key: "sprint-rhythm",
        stage: "test",
        module: null,
        enabledWhen: {}, // Always enabled
      },
      {
        key: "distribution-scheme",
        stage: "test",
        module: "platform",
        enabledWhen: { finance: ["stableRevenue", "unstableRevenue"] },
      },
    ],
  },
  {
    key: "evolve",
    items: [
      {
        key: "roadmap-scalability",
        stage: "evolve",
        module: "platform",
        enabledWhen: { product: ["validated"] },
      },
      {
        key: "rules-review",
        stage: "evolve",
        module: "charter",
        enabledWhen: { management: ["mature"] },
      },
      {
        key: "health-metrics",
        stage: "evolve",
        module: "platform",
        enabledWhen: { management: ["mature"] },
      },
      {
        key: "financial-optimization",
        stage: "evolve",
        module: "platform",
        enabledWhen: { finance: ["stableRevenue", "unstableRevenue"] },
      },
    ],
  },
]

// Helper function to check if an item should be enabled
export const getItemEnabledState = (item, toggles) => {
  if (!item.enabledWhen || Object.keys(item.enabledWhen).length === 0) {
    return true // Always enabled if no conditions
  }

  return Object.entries(item.enabledWhen).every(([aspect, allowedValues]) => {
    return allowedValues.includes(toggles[aspect])
  })
}
