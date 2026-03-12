import { useState, useEffect, useCallback } from "react";

const SETTINGS_KEY = "essen_settings";

interface AppSettings {
  hideConstancias: boolean;
  hideDirectorio: boolean;
  hideSeguros: boolean;
}

const defaultSettings: AppSettings = {
  hideConstancias: true,
  hideDirectorio: false,
  hideSeguros: false,
};

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {}
  return defaultSettings;
}

function saveSettings(settings: AppSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((fn) => fn());
}

export function useSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings);

  useEffect(() => {
    const handler = () => setSettingsState(loadSettings());
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const updateSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const updated = { ...loadSettings(), [key]: value };
    saveSettings(updated);
    setSettingsState(updated);
    notify();
  }, []);

  return { settings, updateSetting };
}
