export const INIT_SETTINGS = 'INIT_SETTINGS'

export function initSettings(settings) {
  return {
    type: INIT_SETTINGS,
    settings,
  }
}
