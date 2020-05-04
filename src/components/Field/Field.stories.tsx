import * as React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Field } from './Field';

export default {
    title: 'Field',
    decorators: [withKnobs],
};
export const DefaultField = () => <Field />;
