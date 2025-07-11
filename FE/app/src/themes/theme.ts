import type { MantineThemeOverride } from '@mantine/core';

export const customTheme: MantineThemeOverride = {

  primaryColor: 'green',
  primaryShade: 6,

  defaultRadius: 'md',
  fontFamily: 'Open Sans, sans-serif',
  headings: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '500',
  },

  components: {
    Button: {
      defaultProps: { color: 'yellow', radius: 'md' },
    },
    TextInput: {
      defaultProps: { radius: 'sm' },
    },
    NumberInput: {
      defaultProps: { radius: 'sm' },
    },
    Table: {
      defaultProps: {
        horizontalSpacing: 'md',
        verticalSpacing: 'sm',
      },
    },
  },
};
