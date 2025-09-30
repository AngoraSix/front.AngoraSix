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
        getImportance: (toggles) => {
          // Always enabled
          const financeMap = {
            noRevenue: 1,
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          }
          return financeMap[toggles.finance] || 2
        },
      },
      {
        key: "team-readiness",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Only enabled for new products
          if (toggles.product !== "new") return 0

          const managementMap = {
            newTeam: 3,
            mature: 2,
          }
          return managementMap[toggles.management] || 2
        },
      },
      {
        key: "team-alignment",
        stage: "alignment",
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
        key: "management-definition",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Only enabled for new teams
          if (toggles.management !== "newTeam") return 0

          const centralizationMap = {
            admin: 1,
            core: 2,
            decentralized: 3,
          }
          return centralizationMap[toggles.centralization] || 2
        },
      },
      {
        key: "product-prevalidation",
        stage: "alignment",
        module: "compass",
        getImportance: (toggles) => {
          // Only enabled for new products
          if (toggles.product !== "new") return 0

          const opennessMap = {
            closed: 2,
            open: 3,
          }
          return opennessMap[toggles.openness] || 2
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
            noDefinitiveRevenue: 2,
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
          const managementMap = {
            newTeam: 3,
            mature: 1,
          }
          return managementMap[toggles.management] || 2
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
          const centralizationMap = {
            admin: 1,
            core: 2,
            decentralized: 3,
          }
          return centralizationMap[toggles.centralization] || 2
        },
      },
      {
        key: "financial-rules",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Only disabled for noRevenue
          if (toggles.finance === "noRevenue") return 0

          const financeMap = {
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          }
          return financeMap[toggles.finance] || 2
        },
      },
      {
        key: "contribution-integrations",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Always enabled
          const opennessMap = {
            closed: 1,
            open: 3,
          }
          return opennessMap[toggles.openness] || 2
        },
      },
      {
        key: "shared-wallet-setup",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Only disabled for noRevenue
          if (toggles.finance === "noRevenue") return 0

          const financeMap = {
            noDefinitiveRevenue: 1,
            stableRevenue: 2,
            unstableRevenue: 3,
          }
          return financeMap[toggles.finance] || 2
        },
      },
      {
        key: "management-tools-setup",
        stage: "setup",
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
        key: "metrics-setup",
        stage: "setup",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const productMap = {
            new: 2,
            validated: 3,
          }
          return productMap[toggles.product] || 2
        },
      },
      {
        key: "job-marketplace",
        stage: "setup",
        module: "platform",
        getImportance: (toggles) => {
          // Only enabled for open projects
          if (toggles.openness !== "open") return 0

          const financeMap = {
            noRevenue: 1,
            noDefinitiveRevenue: 2,
            stableRevenue: 3,
            unstableRevenue: 3,
          }
          return financeMap[toggles.finance] || 2
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
            noDefinitiveRevenue: 1,
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
            noDefinitiveRevenue: 1,
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
          const managementMap = {
            newTeam: 2,
            mature: 3,
          }
          return managementMap[toggles.management] || 2
        },
      },
      {
        key: "health-metrics",
        stage: "implementation",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const managementMap = {
            newTeam: 2,
            mature: 3,
          }
          return managementMap[toggles.management] || 2
        },
      },
      {
        key: "general-roadmap",
        stage: "implementation",
        module: "compass",
        getImportance: (toggles) => {
          // Always enabled
          const productMap = {
            new: 2,
            validated: 3,
          }
          return productMap[toggles.product] || 2
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
