import React from 'react'

import { ChartComponent, TypographyComponent } from '@/components'

import { useThermostat } from '@/hooks/useThermostat'

import { Container, Content, TextContent } from './styles'

const Thermostat: React.FC = () => {
  const { thermostat, temperatureHistory } = useThermostat()
  return (
    <Container>
      <Content>
        {thermostat?.map((temperature) => (
          <TextContent key={temperature.id}>
            <TypographyComponent type='h1'>
              Thermostat {temperature.id}
            </TypographyComponent>
            <TypographyComponent type='h2'>
              {temperature.data}º C
            </TypographyComponent>
          </TextContent>
        ))}
      </Content>
      <ChartComponent temperatureHistory={temperatureHistory} />
    </Container>
  )
}

export default Thermostat
