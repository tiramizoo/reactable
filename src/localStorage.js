export const loadState = (identifier) => {
  try {
    if (!identifier) {
      return undefined
    }
    const serializedState = localStorage.getItem(identifier)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = (identifier, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(identifier, serializedState)
  } catch (error) {}
}
