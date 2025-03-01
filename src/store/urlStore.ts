import { create } from 'zustand';
import axios from 'axios';
import { apiBaseUrl } from '../utils/api';
import {toast} from 'sonner'

interface URL {
    id: string;
    original: string;
    short: string;
    userID: string;
    clicks: number;
    createdAt: string;
}

interface URLStore {
    urls: URL[];
    loading: boolean;
    error: string | null;
    showQR: string | null;
    copied: string | null;
    dropdown: string | null;
    fetchUrls: (token: string | null) => Promise<void>;
    deleteUrl: (shortCode: string, token: string | null) => Promise<void>;
    setShowQR: (shortCode: string | null) => void;
    setCopied: (shortCode: string | null) => void;
    setDropdown: (shortCode: string | null) => void;
}

export const useURLStore = create<URLStore>((set) => ({
    urls: [],
    loading: false,
    error: null,
    showQR: null,
    copied: null,
    dropdown: null,

    fetchUrls: async (token: string | null) => {
        try {
            set({ loading: true });
            if (!token) {
                set({ error: 'No authentication token found', loading: false });
                return;
            }

            const response = await axios.get<{ urls: URL[]; count: number }>(
                `${apiBaseUrl}/urls`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            set({ urls: response.data.urls.map(url => ({ ...url, createdAt: url.createdAt })), error: null });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                set({ error: err.response?.data?.error || 'Failed to fetch URLs' });
            } else {
                set({ error: 'An unexpected error occurred' });
            }
        } finally {
            set({ loading: false });
        }
    },

    deleteUrl: async (shortCode: string, token: string | null) => {
        try {
            set({ loading: true });
            if (!token) {
                set({ error: 'No authentication token found', loading: false });
                return;
            }

            await axios.delete(`${apiBaseUrl}/urls/${shortCode}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Update local state by removing the deleted URL
            set((state) => ({
                urls: state.urls.filter((url) => url.short !== shortCode),
                error: null,
                dropdown: null, // Close dropdown after deletion
            }));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                set({ error: err.response?.data?.error || 'Failed to delete URL' });
            } else {
                set({ error: 'An unexpected error occurred' });
            }
        } finally {
            set({ loading: false });
        }
    },

    setShowQR: (shortCode) => set({ showQR: shortCode }),
    setCopied: (shortCode) => set({ copied: shortCode }),
    setDropdown: (shortCode) => set({ dropdown: shortCode }),
}));