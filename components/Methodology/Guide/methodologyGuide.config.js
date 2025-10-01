// Methodology Guide configuration with updated stages and items

export const methodologyGuideConfig = {
  aspects: {
    product: ["new", "validated"],
    management: ["newTeam", "mature"],
    centralization: ["admin", "core", "decentralized"],
    openness: ["closed", "open"],
    finance: ["noRevenue", "noRevenueYet", "stableRevenue", "unstableRevenue"],
  },
}

// Preset configurations
export const presetConfigs = {
  startup: {
    product: "new",
    management: "newTeam",
    centralization: "core",
    openness: "closed",
    finance: "noRevenueYet",
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
    finance: "stableRevenue",
  },
  subproject: {
    product: "validated",
    management: "mature",
    centralization: "core",
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
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.centralization === "admin" || toggles.finance === "noRevenue" ? 1
            : toggles.management === "newTeam" || toggles.centralization === "decentralized" || toggles.openness === "open" || toggles.finance === "unstableRevenue" ? 3
              : 2
          return value
        },
      },
      {
        key: "team-readiness",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Only enabled for new teams
          if (toggles.management !== "newTeam") return 0
          const value = toggles.centralization === "admin" || toggles.openness === "open" || toggles.finance === "noRevenue" ? 2
            : 3
          return value
        },
      },
      {
        key: "team-alignment",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.management === "mature" || toggles.centralization === "admin" || toggles.openness === "open" || toggles.finance === "noRevenue" || toggles.centralization === "decentralized" ? 2
            : 3
          return value
        },
      },
      {
        key: "management-definition",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Only enabled for new teams
          if (toggles.management !== "newTeam") return 0
          const value = toggles.centralization === "admin" ? 1
            : toggles.finance === "noRevenue" ? 2
              : 3
          return value
        },
      },
      {
        key: "product-prevalidation",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Only enabled for new products
          if (toggles.product !== "new") return 0

          const value = toggles.finance === "noRevenue" ? 2
            : 3
          return value
        },
      },
      {
        key: "product-analysis",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Only enabled for validated products
          if (toggles.product !== "validated") return 0

          const financeMap = {
            noRevenue: 1,
            noRevenueYet: 2,
            stableRevenue: 3,
            unstableRevenue: 3,
          }
          return financeMap[toggles.finance] || 2
        },
      },
      {
        key: "trainings",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.product === "new" || toggles.management === "newTeam" ? 3
            : 2
          return value
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
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.centralization === "admin" ? 1
            : toggles.management === "newTeam" || toggles.centralization === "decentralized" ? 3
              : 2
          return value
        },
      },
      {
        key: "financial-rules",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Only disabled for noRevenue
          if (toggles.finance === "noRevenue") return 0

          const value = toggles.centralization === "admin" ? 1
            : toggles.management === "newTeam" || toggles.centralization === "decentralized" || toggles.finance === "unstableRevenue" ? 3
              : 2
          return value
        },
      },
      {
        key: "contribution-integrations",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Always enabled
          return 3
        },
      },
      {
        key: "shared-wallet-setup",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Only disabled for noRevenue
          if (toggles.finance === "noRevenue") return 0

          const value = toggles.finance === "noRevenueYet" ? 1
            : toggles.centralization === "admin" ? 2
              : 3
          return value
        },
      },
      {
        key: "management-tools-setup",
        stage: "setup",
        module: "compass",
        getImportance: (toggles) => {
          // Only disabled for mature teams
          if (toggles.management === "mature") return 0
          return 3
        }
      },
      {
        key: "metrics-setup",
        stage: "setup",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.management === "newTeam" ? 3
            : toggles.product === "validated" ? 1
              : 2
          return value
        },
      },
      {
        key: "job-marketplace",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Only enabled for open projects
          if (toggles.openness !== "open") return 0
          return 3
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
        getImportance: (toggles) => {
          // Always enabled
          const managementMap = {
            newTeam: 3,
            mature: 2,
          }
          return managementMap[toggles.management] || 2
        },
      },
      {
        key: "ownership-revision",
        stage: "implementation",
        module: "both", // Both compass and platform
        getImportance: (toggles) => {
          // Always enabled
          const centralizationMap = {
            admin: 1,
            core: 2,
            decentralized: 3,
          }
          return centralizationMap[toggles.centralization] || 2
        },
      },
      {
        key: "income-distribution",
        stage: "implementation",
        module: "platform",
        getImportance: (toggles) => {
          // Only disabled for noRevenue
          if (toggles.finance === "noRevenue") return 0

          const financeMap = {
            noRevenueYet: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          }
          return financeMap[toggles.finance] || 2
        },
      },
      {
        key: "governance",
        stage: "implementation",
        module: "platform",
        getImportance: (toggles) => {
          // Always enabled
          const centralizationMap = {
            admin: 1,
            core: 2,
            decentralized: 3,
          }
          return centralizationMap[toggles.centralization] || 2
        },
      },
      {
        key: "ownership-reports",
        stage: "implementation",
        module: "platform",
        getImportance: (toggles) => {
          // Always enabled
          const centralizationMap = {
            admin: 1,
            core: 2,
            decentralized: 3,
          }
          return centralizationMap[toggles.centralization] || 2
        },
      },
      {
        key: "financial-reports",
        stage: "implementation",
        module: "platform",
        getImportance: (toggles) => {
          // Only disabled for noRevenue
          if (toggles.finance === "noRevenue") return 0

          const financeMap = {
            noRevenueYet: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          }
          return financeMap[toggles.finance] || 2
        },
      },
      {
        key: "rules-revision",
        stage: "implementation",
        module: "both", // Both platform and compass
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.product === "new" || toggles.management === "newTeam" ? 1
            : toggles.management === "mature" || toggles.centralization === "admin" ? 2
              : 3
          return value
        },
      },
      {
        key: "health-metrics",
        stage: "implementation",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.product === "new" || toggles.management === "newTeam" ? 1
            : toggles.finance === "unstableRevenue" || toggles.management === "newTeam" || toggles.product === "new" ? 3
              : 2
          return value
        },
      },
      {
        key: "general-roadmap",
        stage: "implementation",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const value = toggles.product === "new" ? 1
            : toggles.finance === "unstableRevenue" || toggles.management === "newTeam" || toggles.product === "new" ? 3
              : 2
          return value
        },
      },
    ],
  },
]

// Helper function to get item importance (0 = disabled, 1-3 = importance level)
export const getItemImportance = (item, toggles) => {
  if (!item.getImportance) {
    return 2 // Default medium importance
  }

  return item.getImportance(toggles)
}
