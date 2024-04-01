export function useLocalStorage(key: string) {
  const setItem = (value: unknown) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error(e)
    }
  }

  return { setItem }
}
