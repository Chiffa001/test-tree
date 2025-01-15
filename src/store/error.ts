import { create } from "zustand";

type State = {
    error: string | null;
};

type Action = {
    addError: (error: string) => void;
    removeError: () => void;
};

export const useErrorState = create<State & Action>((set) => ({
    error: null,
    addError: (error) => set(() => ({ error })),
    removeError: () => set(() => ({ error: null })),
}));
