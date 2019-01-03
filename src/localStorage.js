export const loadState = (containerId) => {
  try {
    const serializedState = localStorage.getItem(containerId)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = (containerId, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(containerId, serializedState)
  } catch (error) {}
}
