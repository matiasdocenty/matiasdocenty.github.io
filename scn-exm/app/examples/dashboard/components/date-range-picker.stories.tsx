import {StoryObj, Meta} from '@storybook/react';

import CalendarDateRangePicker from './date-range-picker';

export default {
  title: 'date-range-picker',
  component: CalendarDateRangePicker,
  args: {
    //TODO: Add args here
  },
} as Meta<typeof CalendarDateRangePicker>;

type Story = StoryObj<typeof CalendarDateRangePicker>;

export const Default: Story = {
  args: {},
};
