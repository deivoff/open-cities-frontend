import * as React from 'react';
import { AppProps } from 'next/app'

import '$static/styles/_main.sass';

const OpenCitiesApp = ({
  Component,
  pageProps
}: AppProps) => <Component {...pageProps} />;

export default OpenCitiesApp;
