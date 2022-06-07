import { H1, H2, H3 } from './styles'

enum Type {
  'h1',
  'h2',
  'h3'
}

interface MyProps {
  children: React.ReactNode
  type: keyof typeof Type
}

const TypographyComponent: React.FC<MyProps> = ({ children, type }) => {
  const makeTypography = {
    h1: () => {
      return <H1>{children}</H1>
    },
    h2: () => {
      return <H2>{children}</H2>
    },
    h3: () => {
      return <H3>{children}</H3>
    }
  }

  const typography = makeTypography[type]
  return typography()
}

export default TypographyComponent
