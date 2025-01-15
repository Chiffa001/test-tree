import { TreeItem as MaterialTreeItem } from "@mui/x-tree-view/TreeItem";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";

import { useTreeQuery } from "@/api/queries";
import { type TreeItem } from "@/types/tree";
import { TreeItemLabel } from "../tree-item-label";
import { ActionModal } from "../action-modal";
import { useModalState } from "@/store/modal";

const renderTree = ({ id, name, children }: TreeItem, isRoot = false) => (
    <MaterialTreeItem
        key={id}
        label={<TreeItemLabel id={id} name={name} canModify={!isRoot} />}
        itemId={String(id)}
    >
        {children.map((item) => renderTree(item))}
    </MaterialTreeItem>
);

export const Tree = () => {
    const { isOpen } = useModalState();
    const { data } = useTreeQuery();

    return (
        <>
            <SimpleTreeView>{renderTree(data, true)}</SimpleTreeView>
            {isOpen && <ActionModal />}
        </>
    );
};
