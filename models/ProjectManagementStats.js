export default class ProjectManagementStats {
  constructor({ projectManagementId, project, contributor }) {
    this.projectManagementId = projectManagementId;
    this.project = new ProjectStats(project);
    this.contributor = contributor ? new ContributorStats(contributor) : null;
  }
}

class ProjectStats {
  constructor({ tasks, contributors }) {
    this.tasks = new TaskStats(tasks);
    this.contributors = contributors.map(
      (contributor) => new ContributorStats(contributor)
    );

    this.tasks.assignedCount = this.contributors.reduce(
      (prev, curr) => prev + curr.tasks.totalCount - curr.tasks.completedCount,
      0
    );

    this.tasks.pendingCount = this.tasks.totalCount - this.tasks.assignedCount;
  }
}

class TaskStats {
  constructor({
    recentlyCompletedCount,
    completedCount,
    totalCount,
    totalEffort,
    completedEffort,
    recentlyCompletedEffort,
  }) {
    this.recentlyCompletedCount = recentlyCompletedCount;
    this.completedCount = completedCount;
    this.totalCount = totalCount;
    this.totalEffort = totalEffort;
    this.completedEffort = completedEffort;
    this.recentlyCompletedEffort = recentlyCompletedEffort;

    this.assignedCount = 0;
    this.pendingCount = totalCount - completedCount;
  }
}

class ContributorStats {
  constructor({ contributorId, tasks }) {
    this.contributorId = contributorId;
    this.tasks = new TaskStats(tasks);

    this.tasks.assignedCount = this.tasks.pendingCount;
  }
}
