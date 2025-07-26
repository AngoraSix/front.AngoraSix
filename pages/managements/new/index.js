import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import NewProjectManagement from '../../../components/Management/New';
import { useAndCheckActiveToken } from '../../../hooks/oauth';
import DefaultLayout from '../../../layouts/DefaultLayout';
import logger from '../../../utils/logger';

const NewProjectManagementPage = ({ session }) => {
    const { t } = useTranslation('management.new');
    useAndCheckActiveToken();

    if (!session || session?.error) {
        logger.error('Log in to register project management');
        return (
            <DefaultLayout contained={false} className="NewProjectManagementLayout__Page">
                <Box>
                    <FormSkeleton />
                </Box>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout contained={false} className="NewProjectManagementLayout__Page">
            <NewProjectManagement />
        </DefaultLayout>
    );
};

NewProjectManagementPage.defaultProps = {
    projectManagementActions: {},
};

NewProjectManagementPage.propTypes = {
};

export const getServerSideProps = async (ctx) => {
    let props = {};

    const session = await getSession(ctx);

    return {
        props: {
            ...props,
            session,
            ...(await serverSideTranslations(ctx.locale, [
                'common',
                'common.legal',
                'management.common',
                'management.new',
            ])),
        },
    };
};

export default NewProjectManagementPage;
