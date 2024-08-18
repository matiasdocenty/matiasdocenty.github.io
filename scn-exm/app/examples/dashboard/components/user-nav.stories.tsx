import {StoryObj, Meta} from '@storybook/react';

import UserNav from './user-nav';

export default {
  title: 'user-nav',
  component: UserNav,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof UserNav>;

type Story = StoryObj<typeof UserNav>;

export const Default: Story = {
  args: {},
};
