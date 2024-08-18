import {StoryObj, Meta} from '@storybook/react';

import MainNav from './main-nav';

export default {
  title: 'main-nav',
  component: MainNav,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof MainNav>;

type Story = StoryObj<typeof MainNav>;

export const Default: Story = {
  args: {},
};
