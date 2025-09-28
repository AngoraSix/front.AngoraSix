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
        title: "Alinear expectativas y roles",
        module: "compass",
        purpose: "Clarificar roles, responsabilidades y expectativas iniciales del equipo.",
        whenToUse: [
          "Al inicio de un nuevo proyecto",
          "Cuando hay confusión sobre roles",
          "Antes de definir la estructura del equipo",
        ],
        steps: [
          "Reunir a todos los stakeholders",
          "Definir roles y responsabilidades",
          "Establecer expectativas claras",
          "Documentar acuerdos iniciales",
        ],
        resources: [
          { name: "Template de Roles", url: "#" },
          { name: "Guía de Expectativas", url: "#" },
        ],
        enabledWhen: { management: ["newTeam"] },
      },
      {
        key: "initial-rhythm",
        stage: "explore",
        title: "Establecer ritmo inicial",
        module: "compass",
        purpose: "Definir un ritmo de trabajo básico para comenzar a operar.",
        whenToUse: [
          "Al inicio de cualquier proyecto",
          "Cuando el equipo necesita estructura",
          "Para establecer rutinas de trabajo",
        ],
        steps: [
          "Definir frecuencia de reuniones",
          "Establecer canales de comunicación",
          "Crear calendario básico",
          "Acordar horarios de trabajo",
        ],
        resources: [{ name: "Template de Ritmo", url: "#" }],
        enabledWhen: {}, // Always enabled
      },
      {
        key: "validate-opportunity",
        stage: "explore",
        title: "Validar problema y oportunidad",
        module: "compass",
        purpose: "Confirmar que existe un problema real y una oportunidad de mercado.",
        whenToUse: [
          "Con productos nuevos o inciertos",
          "Antes de invertir recursos significativos",
          "Para validar hipótesis iniciales",
        ],
        steps: [
          "Identificar el problema a resolver",
          "Investigar el mercado objetivo",
          "Validar con usuarios potenciales",
          "Evaluar la oportunidad",
        ],
        resources: [
          { name: "Canvas de Validación", url: "#" },
          { name: "Guía de Entrevistas", url: "#" },
        ],
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
        title: "Acuerdos base y ownership",
        module: "charter",
        purpose: "Establecer las reglas fundamentales de propiedad y gobernanza del proyecto.",
        whenToUse: [
          "Con equipos core o descentralizados",
          "Cuando hay múltiples stakeholders",
          "Para proyectos con ownership compartido",
        ],
        steps: [
          "Definir estructura de ownership",
          "Establecer reglas de gobernanza",
          "Crear acuerdos de participación",
          "Documentar derechos y obligaciones",
        ],
        resources: [
          { name: "Template Charter", url: "#" },
          { name: "Guía de Ownership", url: "#" },
        ],
        enabledWhen: { centralization: ["core", "decentralized"] },
      },
      {
        key: "processes-tools",
        stage: "define",
        title: "Procesos y herramientas",
        module: null,
        purpose: "Adoptar procesos de trabajo y herramientas para operar eficientemente.",
        whenToUse: ["En todos los proyectos", "Cuando el equipo necesita estructura", "Para mejorar la productividad"],
        steps: [
          "Seleccionar herramientas de trabajo",
          "Definir procesos básicos",
          "Capacitar al equipo",
          "Establecer flujos de trabajo",
        ],
        resources: [
          { name: "Lista de Herramientas", url: "#" },
          { name: "Procesos Recomendados", url: "#" },
        ],
        enabledWhen: {}, // Always enabled
      },
      {
        key: "financial-structure",
        stage: "define",
        title: "Estructura financiera",
        module: "charter",
        purpose: "Definir cómo se manejarán las finanzas y distribuciones del proyecto.",
        whenToUse: [
          "Con proyectos que generan ingresos",
          "Cuando hay inversión o financiamiento",
          "Para proyectos con múltiples participantes",
        ],
        steps: [
          "Definir modelo financiero",
          "Establecer reglas de distribución",
          "Crear estructura de costos",
          "Planificar flujo de caja",
        ],
        resources: [
          { name: "Template Financiero", url: "#" },
          { name: "Guía de Distribuciones", url: "#" },
        ],
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
        title: "Ciclo de experimentos",
        module: null,
        purpose: "Implementar un proceso sistemático de experimentación y aprendizaje.",
        whenToUse: [
          "Con productos en desarrollo",
          "Para validar hipótesis",
          "Cuando hay incertidumbre sobre el mercado",
        ],
        steps: [
          "Definir hipótesis a probar",
          "Diseñar experimentos",
          "Ejecutar y medir resultados",
          "Aprender y ajustar",
        ],
        resources: [
          { name: "Template de Experimentos", url: "#" },
          { name: "Guía Lean Startup", url: "#" },
        ],
        enabledWhen: { product: ["new", "validated"] },
      },
      {
        key: "sprint-rhythm",
        stage: "test",
        title: "Ritmo de sprints",
        module: null,
        purpose: "Establecer un ritmo de trabajo ágil basado en sprints cortos.",
        whenToUse: [
          "En todos los proyectos de desarrollo",
          "Para mejorar la productividad",
          "Cuando se necesita iteración rápida",
        ],
        steps: [
          "Definir duración de sprints",
          "Establecer ceremonias ágiles",
          "Crear backlog de tareas",
          "Implementar retrospectivas",
        ],
        resources: [
          { name: "Guía Scrum Básico", url: "#" },
          { name: "Template Sprint", url: "#" },
        ],
        enabledWhen: {}, // Always enabled
      },
      {
        key: "distribution-scheme",
        stage: "test",
        title: "Esquema de distribución",
        module: "platform",
        purpose: "Implementar un sistema para distribuir valor entre los participantes.",
        whenToUse: [
          "Con proyectos que generan ingresos",
          "Cuando hay múltiples contribuidores",
          "Para incentivar participación",
        ],
        steps: [
          "Definir criterios de distribución",
          "Implementar sistema de tracking",
          "Establecer períodos de pago",
          "Comunicar reglas al equipo",
        ],
        resources: [
          { name: "Calculadora de Distribución", url: "#" },
          { name: "Guía Platform", url: "#" },
        ],
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
        title: "Roadmap y escalabilidad",
        module: "pulse",
        purpose: "Planificar el crecimiento y escalabilidad del proyecto a largo plazo.",
        whenToUse: [
          "Con productos validados y estables",
          "Cuando se planifica crecimiento",
          "Para proyectos en fase de escala",
        ],
        steps: [
          "Analizar métricas actuales",
          "Identificar cuellos de botella",
          "Planificar roadmap de crecimiento",
          "Definir estrategia de escala",
        ],
        resources: [
          { name: "Template Roadmap", url: "#" },
          { name: "Guía de Escalabilidad", url: "#" },
        ],
        enabledWhen: { product: ["validated"] },
      },
      {
        key: "rules-review",
        stage: "evolve",
        title: "Revisión de reglas",
        module: "charter",
        purpose: "Revisar y actualizar las reglas y acuerdos del proyecto periódicamente.",
        whenToUse: ["Con gestión madura", "Cada 6-12 meses", "Cuando cambian las circunstancias"],
        steps: [
          "Revisar acuerdos actuales",
          "Identificar necesidades de cambio",
          "Proponer actualizaciones",
          "Implementar nuevas reglas",
        ],
        resources: [
          { name: "Checklist de Revisión", url: "#" },
          { name: "Template de Cambios", url: "#" },
        ],
        enabledWhen: { management: ["mature"] },
      },
      {
        key: "health-metrics",
        stage: "evolve",
        title: "Métricas de salud",
        module: "pulse",
        purpose: "Monitorear la salud del equipo y del proyecto de forma continua.",
        whenToUse: ["Con gestión madura", "Para proyectos establecidos", "Como buena práctica general"],
        steps: [
          "Definir métricas clave",
          "Implementar sistema de monitoreo",
          "Crear dashboards",
          "Revisar métricas regularmente",
        ],
        resources: [
          { name: "Dashboard Template", url: "#" },
          { name: "Guía de Métricas", url: "#" },
        ],
        enabledWhen: { management: ["mature"] },
      },
      {
        key: "financial-optimization",
        stage: "evolve",
        title: "Optimización financiera",
        module: "platform",
        purpose: "Optimizar la gestión financiera y las distribuciones del proyecto.",
        whenToUse: [
          "Con proyectos que generan ingresos",
          "Para mejorar eficiencia financiera",
          "Cuando se busca optimizar distribuciones",
        ],
        steps: [
          "Analizar flujos financieros",
          "Identificar oportunidades de mejora",
          "Optimizar distribuciones",
          "Implementar mejoras",
        ],
        resources: [
          { name: "Análisis Financiero", url: "#" },
          { name: "Optimizador Platform", url: "#" },
        ],
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
