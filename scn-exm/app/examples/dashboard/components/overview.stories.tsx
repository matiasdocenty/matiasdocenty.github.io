import {StoryObj, Meta} from '@storybook/react';

import Overview from './overview';

export default {
  title: 'overview',
  component: Overview,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof Overview>;

type Story = StoryObj<typeof Overview>;

export const Default: Story = {
  args: {},
};
