import {StoryObj, Meta} from '@storybook/react';

import RecentSales from './recent-sales';

export default {
  title: 'recent-sales',
  component: RecentSales,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof RecentSales>;

type Story = StoryObj<typeof RecentSales>;

export const Default: Story = {
  args: {},
};
