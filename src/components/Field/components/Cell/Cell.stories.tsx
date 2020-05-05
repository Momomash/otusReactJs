import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { Cell, CellStatus } from './Cell';

export default {
    title: 'Cell',
    decorators: [withKnobs],
};

export const Empty = () => [
    <Cell onClick={action('Cell Empty clicked')} status={CellStatus.Empty} key="jsx" />,
];
export const Living = () => [
    <Cell onClick={action('Cell Living clicked')} status={CellStatus.Living} key="jsx" />,
];
export const Young = () => [
    <Cell onClick={action('Cell Young clicked')} status={CellStatus.Young} key="jsx" />,
];