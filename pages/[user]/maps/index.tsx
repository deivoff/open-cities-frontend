import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Page } from '$components/layout';
import { useAuth } from '$context/auth';

const DynamicModal = dynamic(() => import('$widgets/Map/components/CreateMapModal'), { ssr: false });

const UserMapsPage: NextPage = () => {
  const { query } = useRouter();
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>
          Открытые города |
        </title>
      </Head>
      <Page>
        Карты
        <DynamicModal />
      </Page>
    </>
  );
};

export default UserMapsPage;
