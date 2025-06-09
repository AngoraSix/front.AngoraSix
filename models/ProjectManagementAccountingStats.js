export default class ProjectManagementAccountingStats {
  constructor({ projectManagementId, project, contributor }) {
    this.projectManagementId = projectManagementId;
    this.project = new ProjectAccounting(project);
    this.contributor = contributor
      ? new ContributorAccounting(contributor)
      : null;
  }
}

class ProjectAccounting {
  constructor({ finance, ownership }) {
    this.ownership = new Account(ownership);
    this.finance = finance.map((it) => new Account(it));
  }
}

class ContributorAccounting {
  constructor({ contributorId, finance, ownership }) {
    this.contributorId = contributorId;
    this.ownership = new Account(ownership);
    this.finance = finance.map((it) => new Account(it));
  }
}

class Account {
  constructor({ currency, balance, forecastedBalance }) {
    this.currency = currency;
    this.balance = balance;
    this.forecastedBalance = forecastedBalance;
  }
}
