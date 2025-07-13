import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../../../../api';
import FormSkeleton from '../../../../../components/common/Skeletons/FormSkeleton.component';
import SourceSyncForm from '../../../../../components/Management/Integration/SourceSync/Form';
import { useActiveSession } from '../../../../../hooks/oauth';
import DefaultLayout from '../../../../../layouts/DefaultLayout';
import logger from '../../../../../utils/logger';

const NewSourceSyncPage = ({ session, sourceSync }) => {
    const { t } = useTranslation('management.integration.sourcesync');
    useActiveSession();

    if (!session || session.error || !sourceSync) {
        logger.error('Log in to start source sync');
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
                title: t('management.integration.sourcesync.finish.page.title'),
                description: t('management.integration.sourcesync.finish.page.description'),
            }}
        >
            <SourceSyncForm sourceSync={sourceSync} />
        </DefaultLayout>
    );
};

NewSourceSyncPage.defaultProps = {
    isAdmin: false,
};

NewSourceSyncPage.propTypes = {
    projectManagement: PropTypes.object,
    session: PropTypes.object,
    isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
    let props = {};
    const { sourceSyncId } = ctx.params,
        session = await getSession(ctx);
    const validatedToken =
        session?.error !== 'RefreshAccessTokenError' && session?.error !== "SessionExpired" ? session : null;
    try {
        const sourceSync = await api.managementIntegrations.getSourceSync(sourceSyncId, validatedToken);
        props = {
            ...props,
            sourceSync,
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
                "common.legal",
                'management.integration.sourcesync',
                'common.languages',
            ])),
        },
    };
};

export default NewSourceSyncPage;
