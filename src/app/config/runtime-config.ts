export interface RuntimeConfig {
  apiBaseUrl: string;
}

export const runtimeConfig: RuntimeConfig = {
  apiBaseUrl: 'http://localhost:8080'
};

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const response = await fetch('/config.json', { cache: 'no-store' });

    if (!response.ok) {
      return;
    }

    const config = await response.json() as Partial<RuntimeConfig>;

    if (config.apiBaseUrl) {
      runtimeConfig.apiBaseUrl = config.apiBaseUrl.replace(/\/$/, '');
    }
  } catch (error) {
    console.warn('Using default runtime config.', error);
  }
}
