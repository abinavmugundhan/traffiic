import { createClient } from '@insforge/sdk'

const insforgeUrl = import.meta.env.VITE_INSFORGE_URL || 'https://mock.region.insforge.app';
const insforgeAnonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || 'mock-anon-key';

export const insforge = createClient({
  baseUrl: insforgeUrl,
  anonKey: insforgeAnonKey
});
