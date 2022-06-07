import React from 'react'
import { Toaster } from 'react-hot-toast'

import { Container } from './styles'

type Props = {
  children: React.ReactNode
}

const AuthenticatedLayout = ({ children }: Props) => {
  return (
    <Container>
      {children}
      <Toaster position='bottom-right' />
    </Container>
  )
}

export default AuthenticatedLayout
