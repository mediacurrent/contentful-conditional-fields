import React, { useMemo, useState } from 'react';
import { Grid } from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';
import { FieldWrapper, Field } from '@contentful/default-field-editors';

const Entry = () => {
  const sdk = useSDK();
  const [disabledFields, setDisabledFields] = useState([]);
  const getFieldAPI = (fieldId, sdk) => {
    return sdk.entry.fields[fieldId].getForLocale(sdk.locales.default)
  }

  const getFieldExtensionSdk = (fieldId, sdk) => {
    return Object.assign({ field: getFieldAPI(fieldId, sdk) }, sdk)
  }

  const fields = useMemo(
    () =>
      Object.values(sdk.entry.fields).map((field) => {
        const fieldExtensionSdk = getFieldExtensionSdk(field.id, sdk);
        if (field.id === 'heroType') {
          fieldExtensionSdk.field.onValueChanged((value) => {
            const disabledFieldsByType = {
              'Short Hero': [
                'mediaAsset',
                'ctaLink',
              ],
              'Minimalist Hero': [
                'image',
                'mediaAsset',
                'ctaLink',
              ],
            };
            setDisabledFields(disabledFieldsByType[value] ?? []);
          })
        }
        return {
          field,
          sdk: fieldExtensionSdk,
        }
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [sdk.entry.fields]
  )

  return (
    <Grid
      style={{ maxWidth: '768px', margin: 'auto' }}
      columns="1fr"
    >
      {fields.map(({ field, sdk }) => {
        return disabledFields.includes(field.id) ? null : (
          <Grid.Item key={field.id}>
            <FieldWrapper key={field.id} sdk={sdk} name={field.name}>
              <Field sdk={sdk} />
            </FieldWrapper>
          </Grid.Item>
        )
      })}
    </Grid>
  )
};

export default Entry;
