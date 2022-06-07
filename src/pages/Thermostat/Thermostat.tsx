import React from 'react'

import { ChartComponent, TypographyComponent } from '@/components'

import { useThermostat } from '@/hooks/useThermostat'

import { Container, Content, TextContent } from './styles'

const Thermostat: React.FC = () => {
  const { thermostat, temperatureHistory } = useThermostat()
  return (
    <Container>
      <TypographyComponent type='h1'>Directory</TypographyComponent>

      <Content>
        <TextContent>
          {thermostat?.map((temperature) => (
            <TypographyComponent type='h2' key={temperature.id}>
              {temperature.data}
            </TypographyComponent>
          ))}
          <ChartComponent temperatureHistory={temperatureHistory} />
        </TextContent>
      </Content>
    </Container>
  )
}

export default Thermostat
