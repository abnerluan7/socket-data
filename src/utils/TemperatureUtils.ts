import toast from 'react-hot-toast'
import { ReadyState } from 'react-use-websocket'

import { Temperature } from '@/types/Thermostat'

export const checkTemperatureValid = (
  currentTime: number,
  temperature: Temperature
): boolean => {
  const difference = currentTime - temperature.timestamp
  const minutesDifference = Math.floor(difference / 1000 / 60)
  if (temperature.data <= 100) {
    return minutesDifference >= -5
  }
  return false
}

export const checkIsLastTemperatureForThermostat = (
  temperatures: Temperature[],
  id: number
): Temperature => {
  return temperatures.filter((e) => e.id === id).length > 0
    ? temperatures
        .filter((e) => e.id === id)
        .reduce((prev, current) => {
          return prev.timestamp > current.timestamp ? prev : current
        })
    : null
}

export const checkIsLastTemperature = (
  temperatures: Temperature[]
): Temperature[] => {
  const lastTemperatureThermostatOne = checkIsLastTemperatureForThermostat(
    temperatures,
    1
  )

  const lastTemperatureThermostatTwo = checkIsLastTemperatureForThermostat(
    temperatures,
    2
  )
  const responseThermostat = []
  if (lastTemperatureThermostatOne) {
    responseThermostat.push(lastTemperatureThermostatOne)
  }
  if (lastTemperatureThermostatTwo) {
    responseThermostat.push(lastTemperatureThermostatTwo)
  }
  return responseThermostat
}

export const useToast = {
  [ReadyState.OPEN]: () => {
    toast.success('Socket Connected!')
  },
  [ReadyState.CLOSED]: () => {
    toast.error('Socket Disconnected!')
  },
  [ReadyState.CONNECTING]: () => {
    toast.loading('Connecting Socket', { duration: 400 })
  },
  [ReadyState.CLOSING]: () => {
    toast.loading('Connecting Socket', { duration: 400 })
  },
  [ReadyState.UNINSTANTIATED]: () => {
    toast.error('Socket Disconnected!')
  }
}

export const checkNeedNewMessage = (lastMessageTime: number): boolean => {
  const difference = new Date().getTime() - lastMessageTime
  const minutesDifference = Math.floor(difference / 1000)
  return minutesDifference >= 2
}
