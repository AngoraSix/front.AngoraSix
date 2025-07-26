import { getFromEnvsOrElse } from "../utils/config";

class Mgmt {
    constructor(env) {
        this.categories = {
            ownershipGeneral: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_CATEGORIES_OWNERSHIP_GENERAL', 'OWNERSHIP.GENERAL'),
            ownershipTasks: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_CATEGORIES_OWNERSHIP_TASKS', 'OWNERSHIP.TASKS'),
            ownershipGovernance: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_CATEGORIES_OWNERSHIP_GOVERNANCE', 'OWNERSHIP.GOVERNANCE'),
            financialProfitShares: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_CATEGORIES_FINANCIAL_PROFIT_SHARES', 'FINANCIAL.PROFIT_SHARES'),
            financialCurrencies: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_CATEGORIES_FINANCIAL_CURRENCIES', 'FINANCIAL.CURRENCIES'),
            financialGeneral: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_CATEGORIES_FINANCIAL_GENERAL', 'FINANCIAL.GENERAL')
        };
        this.ownershipBylaws = {
            isOwnershipA6Managed: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_OWNERSHIP_IS_A6MANAGED', 'OWNERSHIP_IS_A6MANAGED'),
            // startupTasksEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_STARTUP_TASKS_ENABLED', 'STARTUP_TASKS_ENABLED'),
            ownershipEphemeralEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_EPHEMERAL_ENABLED', 'EPHEMERAL_ENABLED'),
            startupEphemeralPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_STARTUP_EPHEMERAL_PERIOD', 'STARTUP_EPHEMERAL_PERIOD'),
            regularEphemeralPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_REGULAR_EPHEMERAL_PERIOD', 'REGULAR_EPHEMERAL_PERIOD'),
            ephemeralPattern: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_EPHEMERAL_PATTERN', 'EPHEMERAL_PATTERN'),
            coordinationGroupEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_COORDINATION_GROUP_ENABLED', 'COORDINATION_GROUP_ENABLED'),
            ownershipVotingLimit: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_OWNERSHIP_VOTING_LIMITD', 'OWNERSHIP_VOTING_LIMIT'),
            decisionMinimumQuorum: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_DECISION_MINIMUM_QUORUM', 'DECISION_MINIMUM_QUORUM'),
        };
        this.financialBylaws = {
            isFinancialA6Managed: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_FINANCIAL_IS_A6MANAGED', 'FINANCIAL_IS_A6MANAGED'),
            profitSharesEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_ENABLED', 'PROFIT_SHARES_ENABLED'),
            profitSharesVestingEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_VESTING_ENABLED', 'PROFIT_SHARES_VESTING_ENABLED'),
            profitSharesStartupVestingPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_STARTUP_VESTING_PERIOD', 'PROFIT_SHARES_STARTUP_VESTING_PERIOD'),
            profitSharesRegularVestingPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_REGULAR_VESTING_PERIOD', 'PROFIT_SHARES_REGULAR_VESTING_PERIOD'),
            profitSharesVestingPattern: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_VESTING_PATTERN', 'PROFIT_SHARES_VESTING_PATTERN'),
            financialCurrencies: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_FINANCIAL_CURRENCIES', 'FINANCIAL_CURRENCIES'),
            currencyGeneralSetupEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY_GENERAL_SETUP', 'CURRENCY_GENERAL_SETUP'),
            currencyVestingEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY_VESTING_ENABLED', '{{CURRENCY}}--VESTING_ENABLED'),
            currencyStartupVestingPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY_STARTUP_VESTING_PERIOD', '{{CURRENCY}}--STARTUP_VESTING_PERIOD'),
            currencyRegularVestingPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY_REGULAR_VESTING_PERIOD', '{{CURRENCY}}--REGULAR_VESTING_PERIOD'),
            currencyVestingPattern: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY_VESTING_PATTERN', '{{CURRENCY}}--VESTING_PATTERN'),
            earningDistributionTriggerType: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_TRIGGER_TYPE', 'EARNING_DISTRIBUTION_TRIGGER_TYPE'),
            earningDistributionTriggerAmount: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_TRIGGER_AMOUNT', 'EARNING_DISTRIBUTION_TRIGGER_AMOUNT'),
            earningDistributionTriggerCurrency: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_TRIGGER_CURRENCY', 'EARNING_DISTRIBUTION_TRIGGER_CURRENCY'),
            earningDistributionReviewFrequency: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_REVIEW_FREQUENCY', 'EARNING_DISTRIBUTION_REVIEW_FREQUENCY'),
        };
    }
}

export default Mgmt;
