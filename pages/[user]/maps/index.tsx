import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import { useLazyQuery } from '@apollo/react-hooks';
import { Page } from '$components/layout';
import { useAuth } from '$context/auth';
import { GET_MAPS, GetMaps, GetMapsVariables } from '$apollo/queries';
import { Spiner } from '$components/spiner';
import { Header } from '$widgets/Header';

const CreateMapModal = dynamic(() => import('$widgets/Map_old/components/CreateMapModal'), { ssr: false });

const UserMapsPage: NextPage = () => {
  const { query } = useRouter();
  const { user } = useAuth();
  const userId = query['user'] as string;
  const [getMaps, { data, loading, error }] = useLazyQuery<GetMaps, GetMapsVariables>(GET_MAPS);

  useEffect(() => {
    if (userId) getMaps({ variables: { userId } });
  }, [userId, getMaps]);

  if (loading || !data) return <Spiner />;
  if (error) return <Error statusCode={500} />;

  const { maps } = data;

  return (
    <>
      <Head>
        <title>
          {user?.name.givenName} {user?.name.familyName} | Открытые города
        </title>
      </Head>
      <Header />
      <Page>
        <Page.Wrapper>
          Карты
          <CreateMapModal />
          <ul>
            {maps.map(({ name, _id }) => (<li key={_id}>{name}</li>))}
          </ul>
        </Page.Wrapper>
      </Page>
    </>
  );
};

export default UserMapsPage;
