import {StoryObj, Meta} from '@storybook/react';

import Search from './search';

export default {
  title: 'search',
  component: Search,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof Search>;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {},
};
