'use client'

import { Alert, Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import config from '../../config'
import {useSession} from "next-auth/react";

const ProjectsComponent = ({ managements }) => {
  const { t } = useTranslation('projects')
  const { data: session } = useSession();
  console.log("FINAL");
  console.log(managements);
  console.log(managements.collection[0].project);
  console.log(managements.collection[0].members);
  console.log("USER SESSION");
  console.log(session.user.id);

  return (
    <>
      <Head>
        <title>{t('page.title')}</title>
        <meta name="description" content={t('page.description')} />

        <meta property="og:title" key="og.title" content={t('page.title')} />
        <meta
          property="og:description"
          key="og.description"
          content={t('page.description')}
        />
        <meta
          property="og:image"
          key="og.image"
          content={config.site.head.image.logoSquare}
        />
        <meta
          property="og:url"
          key="og.url"
          content="https://angorasix.com/projects"
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="projects-page">
        <Container maxWidth="lg" className="projects-container">
          <Box py={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {t('title')}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {t('description')}
            </Typography>

            {managements.length === 0 ? (
              <Box py={4}>
                <Alert severity="info">{t('empty.message')}</Alert>
              </Box>
            ) : (
              <Box py={4}>
                {/* Projects list will go here */}
                <Typography variant="body2" color="text.secondary">
                  {t('list.placeholder')}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ProjectsComponent
