import {StoryObj, Meta} from '@storybook/react';

import TeamSwitcher from './team-switcher';

export default {
  title: 'team-switcher',
  component: TeamSwitcher,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof TeamSwitcher>;

type Story = StoryObj<typeof TeamSwitcher>;

export const Default: Story = {
  args: {},
};
