import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import useWebSocket from 'react-use-websocket'

import {
  checkIsLastTemperature,
  checkNeedNewMessage,
  checkTemperatureValid,
  currentTime,
  useToast
} from '@/utils/TemperatureUtils'

import { Temperature } from '@/types/Thermostat'

interface TypesThisContext {
  thermostat: Temperature[]
  temperatureHistory: Temperature[]
  makeTemperatures: (newThermostat: Temperature[]) => void
}

export interface MyProps {
  children?: React.ReactNode
}

const ThermostatContext = createContext<TypesThisContext>(
  {} as TypesThisContext
)

export const ThermostatProvider: React.FC<MyProps> = ({ children }) => {
  const [lastMessageTime, setLastMessage] = useState(currentTime())
  const [temperatureHistory, setTemperatureHistory] = useState<Temperature[]>(
    []
  )
  const { lastMessage, readyState } = useWebSocket<Temperature[]>(
    process.env.API_URL
  )

  useEffect(() => {
    const executeToast = useToast[readyState]
    executeToast()
  }, [readyState])

  const thermostat: Temperature[] = useMemo(() => {
    const responseThermostat = checkIsLastTemperature(temperatureHistory)
    return responseThermostat
  }, [temperatureHistory])

  useEffect(() => {
    if (lastMessage !== null && checkNeedNewMessage(lastMessageTime)) {
      const newThermostat: Temperature[] = JSON.parse(lastMessage.data)
      makeTemperatures(newThermostat)
      setLastMessage(currentTime())
    }
  }, [lastMessage])

  const makeTemperatures = (newThermostat: Temperature[]) => {
    let newTemperatureHistory: Temperature[] = []
    newThermostat.forEach((temperature) => {
      if (checkTemperatureValid(currentTime(), temperature)) {
        newTemperatureHistory.push(temperature)
      }
    })

    setTemperatureHistory((prev) => {
      const acceptableTemperatures: Temperature[] = []
      prev.forEach((oldTemperature) => {
        if (checkTemperatureValid(currentTime(), oldTemperature)) {
          acceptableTemperatures.push(oldTemperature)
        }
      })
      newTemperatureHistory = [
        ...newTemperatureHistory,
        ...acceptableTemperatures
      ]
      return newTemperatureHistory
    })
  }

  return (
    <ThermostatContext.Provider
      value={{
        thermostat,
        temperatureHistory,
        makeTemperatures
      }}
    >
      {children}
    </ThermostatContext.Provider>
  )
}

export const useThermostat = () => {
  const useThermostatContext = useContext(ThermostatContext)

  return useThermostatContext
}
