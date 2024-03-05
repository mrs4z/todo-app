interface IUseStorage {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;
}

const useStorage = (): IUseStorage => {
  const getItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error parsing JSON from localStorage', error);
      return null;
    }
  };

  const setItem = <T>(key: string, value: T): void => {
    try {
      const item = JSON.stringify(value);
      localStorage.setItem(key, item);
    } catch (error) {
      console.error('Error stringifying JSON for localStorage', error);
    }
  };

  const removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};

export default useStorage;
