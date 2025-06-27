import { MantineThemeOverride } from '@mantine/core';

export const customTheme: MantineThemeOverride = {
  // 1) primaryColor + shade
  primaryColor: 'green',
  primaryShade: 6,

  // 2) rounding & fonts
  defaultRadius: 'md',
  fontFamily: 'Open Sans, sans-serif',
  headings: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '500',
  },

  // 3) ensure all Mantine Buttons default to yellow
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
