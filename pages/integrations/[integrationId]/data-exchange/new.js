import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../../../api';
import FormSkeleton from '../../../../components/common/Skeletons/FormSkeleton.component';
import DataExchangeForm from '../../../../components/Management/Integration/DataExchange/Form';
import { useActiveSession } from '../../../../hooks/oauth';
import DefaultLayout from '../../../../layouts/DefaultLayout';
import logger from '../../../../utils/logger';

const NewDataExchangePage = ({ session, dataExchange }) => {
    const { t } = useTranslation('management.integration.dataexchange¡');
    useActiveSession();

    if (!session || session.error || !dataExchange) {
        logger.error('Log in to start data exchange');
        return (
            <DefaultLayout>
                <Box>
                    <FormSkeleton />
                </Box>
            </DefaultLayout>
        );
    }
    return (
        <DefaultLayout
            headData={{
                title: t('management.integration.dataexchange.new.page.title'),
                description: t('management.integration.dataexchange.new.page.description'),
            }}
        >
            <DataExchangeForm dataExchange={dataExchange} />
        </DefaultLayout>
    );
};

NewDataExchangePage.defaultProps = {
    isAdmin: false,
};

NewDataExchangePage.propTypes = {
    projectManagement: PropTypes.object,
    session: PropTypes.object,
    isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
    let props = {};
    const { integrationId } = ctx.params,
        session = await getSession(ctx);
    const validatedToken =
        session?.error !== 'RefreshAccessTokenError' ? session : null;
    try {
        const dataExchange = await api.managementIntegrations.createDataExchange(integrationId, validatedToken);
        props = {
            ...props,
            dataExchange,
        };
    } catch (err) {
        logger.error('err', err);
    }

    return {
        props: {
            ...props,
            session,
            ...(await serverSideTranslations(ctx.locale, [
                'common',
                'management.integration.dataexchange',
                'common.languages',
            ])),
        },
    };
};

export default NewDataExchangePage;
