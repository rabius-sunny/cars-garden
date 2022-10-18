import { ButtonStylesParams } from '@mantine/core'
export const ctheme = {
  components: {
    Button: {
      styles: (theme: any, params: ButtonStylesParams) => ({
        root: {
          backgroundColor:
            params.variant === 'filled'
              ? theme.colors[params.color || theme.primaryColor][9]
              : undefined
        }
      })
    }
  }
}
