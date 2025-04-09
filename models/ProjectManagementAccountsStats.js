export default class ProjectManagementAccountsStats {
  constructor({ projectManagementId, project, contributor }) {
    this.projectManagementId = projectManagementId;
    this.project = new ProjectAccounts(project);
    this.contributor = contributor
      ? new ContributorAccounts(contributor)
      : null;
  }
}

class ProjectAccounts {
  constructor({ finance, ownership }) {
    this.ownership = new Account(ownership);
    this.finance = finance.map((it) => new Account(it));
  }
}

class ContributorAccounts {
  constructor({ contributorId, finance, ownership }) {
    this.contributorId = contributorId;
    this.ownership = new Account(ownership);
    this.finance = finance.map((it) => new Account(it));
  }
}

class Account {
  constructor({ currency, balance }) {
    this.currency = currency;
    this.balance = balance;
  }
}
