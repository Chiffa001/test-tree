import {
    queryOptions,
    useMutation,
    useSuspenseQuery,
} from "@tanstack/react-query";
import { addTreeItem, deleteTreeItem, editTreeItem, getTreeData } from "./api";
import { queryClient } from "./query-client";
import { ActionType } from "@/types/action";

export const queryKeys = {
    tree: ["tree"],
    modifyItem: ["modifyItem"],
};

export const treeQueryOptions = () =>
    queryOptions({
        queryKey: queryKeys.tree,
        queryFn: getTreeData,
    });

export const useTreeQuery = () => useSuspenseQuery(treeQueryOptions());

type Payload = {
    nodeId: number;
    name: string;
    actionType: ActionType;
};

export const useModifyTreeItemMutation = () =>
    useMutation({
        mutationKey: queryKeys.modifyItem,
        mutationFn: async ({ actionType, name, nodeId }: Payload) => {
            switch (actionType) {
                case ActionType.ADD:
                    return addTreeItem({ parentId: nodeId, name });
                case ActionType.DELETE:
                    return deleteTreeItem({ nodeId });
                case ActionType.EDIT:
                    return editTreeItem({ nodeId, newNodeName: name });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.tree });
        },
    });
