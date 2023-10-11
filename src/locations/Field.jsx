import React from 'react';
import { Paragraph } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

const Field = () => {
  const sdk = useSDK();
  return <Paragraph>Hello Field Component (AppId: {sdk.ids.app})</Paragraph>;
};

export default Field;
