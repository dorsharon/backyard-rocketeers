import { create } from "zustand";

/**
 * UI Store using Zustand.
 * IMPORTANT: Use ONLY for UI state (modals, selections, preferences).
 * DO NOT use for game state - that comes from Colyseus.
 *
 * See CLAUDE.md - "When to Use What" section.
 */

interface UIState {
  // Modal states
  isSettingsOpen: boolean;
  isHelpOpen: boolean;

  // Selected card (for targeting)
  selectedCardId: string | null;

  // UI preferences
  soundEnabled: boolean;
  animationsEnabled: boolean;

  // Actions
  setSettingsOpen: (isOpen: boolean) => void;
  setHelpOpen: (isOpen: boolean) => void;
  setSelectedCard: (cardId: string | null) => void;
  toggleSound: () => void;
  toggleAnimations: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isSettingsOpen: false,
  isHelpOpen: false,
  selectedCardId: null,
  soundEnabled: true,
  animationsEnabled: true,

  // Actions
  setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),
  setHelpOpen: (isOpen) => set({ isHelpOpen: isOpen }),
  setSelectedCard: (cardId) => set({ selectedCardId: cardId }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
}));
