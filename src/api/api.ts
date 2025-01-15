import type { TreeItem } from "@/types/tree";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.params = {
    treeName: import.meta.env.VITE_TREE_NAME,
};

export const getTreeData = async () => {
    const { data } = await axios.post<TreeItem>("/api.user.tree.get");
    return data;
};

export const addTreeItem = async ({
    parentId,
    name,
}: {
    parentId: number;
    name: string;
}) =>
    axios.post("/api.user.tree.node.create", undefined, {
        params: { parentNodeId: parentId, nodeName: name },
    });

export const deleteTreeItem = async ({ nodeId }: { nodeId: number }) =>
    axios.post("/api.user.tree.node.delete", undefined, {
        params: { nodeId },
    });

export const editTreeItem = async ({
    nodeId,
    newNodeName,
}: {
    nodeId: number;
    newNodeName: string;
}) =>
    axios.post("/api.user.tree.node.rename", undefined, {
        params: { nodeId, newNodeName },
    });
