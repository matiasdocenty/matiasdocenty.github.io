import {StoryObj, Meta} from '@storybook/react';

import DashboardPage from './page';

export default {
  title: 'page',
  component: DashboardPage,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof DashboardPage>;

type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
  args: {},
};
