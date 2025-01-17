import { type MouseEvent, type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/ModeEditOutline";
import IconButton from "@mui/material/IconButton";
import type { TreeItem } from "@/types/tree";
import { useModalState } from "@/store";
import { ActionType } from "@/types/action";

type Props = {
    canModify?: boolean;
} & Omit<TreeItem, "children">;

export const TreeItemLabel: FC<Props> = ({ name, id, canModify = true }) => {
    const { openModal } = useModalState();

    const clickHandlerCreator = (actionType: ActionType) => (e: MouseEvent) => {
        e.stopPropagation();
        openModal({
            actionType,
            id,
            name: actionType === ActionType.ADD ? "" : name,
        });
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center" gap={0.3}>
            <Typography
                maxWidth="100vw"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {name}
            </Typography>
            <IconButton onClick={clickHandlerCreator(ActionType.ADD)}>
                <AddIcon />
            </IconButton>
            {canModify && (
                <>
                    <IconButton onClick={clickHandlerCreator(ActionType.EDIT)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={clickHandlerCreator(ActionType.DELETE)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )}
        </Box>
    );
};
