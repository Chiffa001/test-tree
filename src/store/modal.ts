import { ActionType } from "@/types/action";
import { create } from "zustand";

type State = {
    activeId: number | null;
    isOpen: boolean;
    activeName: string;
    actionType: ActionType | null;
};

type Action = {
    openModal: ({
        actionType,
        id,
        name,
    }: {
        actionType: ActionType;
        name?: string;
        id: number;
    }) => void;
    closeModal: () => void;
};

export const useModalState = create<State & Action>((set) => ({
    isOpen: false,
    activeName: "",
    actionType: null,
    activeId: null,
    openModal: ({ actionType, id, name = "" }) =>
        set(() => ({
            isOpen: true,
            actionType,
            activeId: id,
            activeName: name,
        })),
    closeModal: () =>
        set(() => ({
            isOpen: false,
            actionType: null,
            activeId: null,
            activeName: "",
        })),
}));
