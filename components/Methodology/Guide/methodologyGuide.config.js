// Methodology Guide configuration with updated stages and items

export const methodologyGuideConfig = {
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
    key: "alignment",
    items: [
      {
        key: "fairness-assessment",
        stage: "alignment",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          finance: {
            noRevenue: 1,
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          },
        },
      },
      {
        key: "team-readiness",
        stage: "alignment",
        module: "compass",
        enabledWhen: { product: ["new"] },
        importanceWhen: {
          management: {
            newTeam: 3,
            mature: 2,
          },
        },
      },
      {
        key: "team-alignment",
        stage: "alignment",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          management: {
            newTeam: 3,
            mature: 2,
          },
        },
      },
      {
        key: "management-definition",
        stage: "alignment",
        module: "compass",
        enabledWhen: { management: ["newTeam"] },
        importanceWhen: {
          centralization: {
            admin: 1,
            core: 2,
            decentralized: 3,
          },
        },
      },
      {
        key: "product-prevalidation",
        stage: "alignment",
        module: "compass",
        enabledWhen: { product: ["new"] },
        importanceWhen: {
          openness: {
            closed: 2,
            open: 3,
          },
        },
      },
      {
        key: "product-analysis",
        stage: "alignment",
        module: "compass",
        enabledWhen: { product: ["validated"] },
        importanceWhen: {
          finance: {
            noRevenue: 1,
            noDefinitiveRevenue: 2,
            stableRevenue: 3,
            unstableRevenue: 3,
          },
        },
      },
      {
        key: "trainings",
        stage: "alignment",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          management: {
            newTeam: 3,
            mature: 1,
          },
        },
      },
    ],
  },
  {
    key: "setup",
    items: [
      {
        key: "governance-rules",
        stage: "setup",
        module: "platform",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          centralization: {
            admin: 1,
            core: 2,
            decentralized: 3,
          },
        },
      },
      {
        key: "financial-rules",
        stage: "setup",
        module: "platform",
        enabledWhen: { finance: ["noDefinitiveRevenue", "stableRevenue", "unstableRevenue"] },
        importanceWhen: {
          finance: {
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          },
        },
      },
      {
        key: "contribution-integrations",
        stage: "setup",
        module: "platform",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          openness: {
            closed: 1,
            open: 3,
          },
        },
      },
      {
        key: "shared-wallet-setup",
        stage: "setup",
        module: "platform",
        enabledWhen: { finance: ["noDefinitiveRevenue", "stableRevenue", "unstableRevenue"] },
        importanceWhen: {
          finance: {
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          },
        },
      },
      {
        key: "management-tools-setup",
        stage: "setup",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          management: {
            newTeam: 3,
            mature: 2,
          },
        },
      },
      {
        key: "metrics-setup",
        stage: "setup",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          product: {
            new: 2,
            validated: 3,
          },
        },
      },
      {
        key: "job-marketplace",
        stage: "setup",
        module: "platform",
        enabledWhen: { openness: ["open"] },
        importanceWhen: {
          finance: {
            noRevenue: 1,
            noDefinitiveRevenue: 2,
            stableRevenue: 3,
            unstableRevenue: 3,
          },
        },
      },
    ],
  },
  {
    key: "implementation",
    items: [
      {
        key: "agile-ceremonies",
        stage: "implementation",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          management: {
            newTeam: 3,
            mature: 2,
          },
        },
      },
      {
        key: "ownership-revision",
        stage: "implementation",
        module: "both", // Both compass and platform
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          centralization: {
            admin: 1,
            core: 2,
            decentralized: 3,
          },
        },
      },
      {
        key: "income-distribution",
        stage: "implementation",
        module: "platform",
        enabledWhen: { finance: ["noDefinitiveRevenue", "stableRevenue", "unstableRevenue"] },
        importanceWhen: {
          finance: {
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          },
        },
      },
      {
        key: "governance",
        stage: "implementation",
        module: "platform",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          centralization: {
            admin: 1,
            core: 2,
            decentralized: 3,
          },
        },
      },
      {
        key: "ownership-reports",
        stage: "implementation",
        module: "platform",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          centralization: {
            admin: 1,
            core: 2,
            decentralized: 3,
          },
        },
      },
      {
        key: "financial-reports",
        stage: "implementation",
        module: "platform",
        enabledWhen: { finance: ["noDefinitiveRevenue", "stableRevenue", "unstableRevenue"] },
        importanceWhen: {
          finance: {
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          },
        },
      },
      {
        key: "rules-revision",
        stage: "implementation",
        module: "both", // Both platform and compass
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          management: {
            newTeam: 2,
            mature: 3,
          },
        },
      },
      {
        key: "health-metrics",
        stage: "implementation",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          management: {
            newTeam: 2,
            mature: 3,
          },
        },
      },
      {
        key: "general-roadmap",
        stage: "implementation",
        module: "compass",
        enabledWhen: {}, // Always enabled
        importanceWhen: {
          product: {
            new: 2,
            validated: 3,
          },
        },
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

// Helper function to get item importance level (1-3)
export const getItemImportance = (item, toggles) => {
  if (!item.importanceWhen || Object.keys(item.importanceWhen).length === 0) {
    return 2 // Default medium importance
  }

  // Get the first matching importance rule
  for (const [aspect, importanceMap] of Object.entries(item.importanceWhen)) {
    const currentValue = toggles[aspect]
    if (importanceMap[currentValue] !== undefined) {
      return importanceMap[currentValue]
    }
  }

  return 2 // Default medium importance
}
