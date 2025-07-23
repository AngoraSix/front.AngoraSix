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
            startupTasksEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_STARTUP_TASKS_ENABLED', 'STARTUP_TASKS_ENABLED'),
            startupTasksFadingEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_STARTUP_TASKS_FADING_ENABLED', 'STARTUP_TASKS_FADING_ENABLED'),
            startupRetributionPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_STARTUP_RETRIBUTION_PERIOD', 'STARTUP_RETRIBUTION_PERIOD'),
            startupRetributionPattern: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_STARTUP_RETRIBUTION_PATTERN', 'STARTUP_RETRIBUTION_PATTERN'),
            regularRetributionPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_REGULAR_RETRIBUTION_PERIOD', 'REGULAR_RETRIBUTION_PERIOD'),
            regularRetributionPattern: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_REGULAR_RETRIBUTION_PATTERN', 'REGULAR_RETRIBUTION_PATTERN'),
            coordinationCircleEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_COORDINATION_CIRCLE_ENABLED', 'COORDINATION_CIRCLE_ENABLED'),
            ownershipVotingLimit: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_OWNERSHIP_VOTING_LIMITD', 'OWNERSHIP_VOTING_LIMIT'),
            decisionMinimumQuorum: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_DECISION_MINIMUM_QUORUM', 'DECISION_MINIMUM_QUORUM'),
        };
        this.financialBylaws = {
            isFinancialA6Managed: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_OWNERSHIP_FINANCIAL_IS_A6MANAGED', 'FINANCIAL_IS_A6MANAGED'),
            profitSharesEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_ENABLED', 'PROFIT_SHARES_ENABLED'),
            profitSharesVestingEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_VESTING_ENABLED', 'PROFIT_SHARES_VESTING_ENABLED'),
            profitSharesVestingPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_VESTING_PERIOD', 'PROFIT_SHARES_VESTING_PERIOD'),
            profitSharesVestingPattern: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_PROFIT_SHARES_VESTING_PATTERN', 'PROFIT_SHARES_VESTING_PATTERN'),
            financialCurrencies: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_FINANCIAL_CURRENCIES', 'FINANCIAL_CURRENCIES'),
            currencyVestingEnabled: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY-VESTING_ENABLED', '{CURRENCY}--VESTING_ENABLED'),
            currencyVestingPeriod: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY-VESTING_PERIOD', '{CURRENCY}--VESTING_PERIOD'),
            currencyVestingPattern: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_CURRENCY-VESTING_PATTERN', '{CURRENCY}--VESTING_PATTERN'),
            earningDistributionTriggerType: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_TRIGGER_TYPE', 'EARNING_DISTRIBUTION_TRIGGER_TYPE'),
            earningDistributionTriggerAmount: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_TRIGGER_AMOUNT', 'EARNING_DISTRIBUTION_TRIGGER_AMOUNT'),
            earningDistributionTriggerCurrency: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_TRIGGER_CURRENCY', 'EARNING_DISTRIBUTION_TRIGGER_CURRENCY'),
            earningDistributionReviewFrequency: getFromEnvsOrElse(env, 'A6_APP_MGMT_BYLAWS_FINANCIAL_EARNING_DISTRIBUTION_REVIEW_FREQUENCY', 'EARNING_DISTRIBUTION_REVIEW_FREQUENCY'),
        };
    }
}

export default Mgmt;
