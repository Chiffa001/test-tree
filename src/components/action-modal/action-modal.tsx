import { useModifyTreeItemMutation } from "@/api/queries";
import { useModalState } from "@/store/modal";
import { ActionType } from "@/types/action";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState, type FC, ChangeEventHandler } from "react";

export const ActionModal: FC = () => {
    const { actionType, activeName, activeId, closeModal } = useModalState();
    const [name, setName] = useState(activeName);
    const { mutateAsync, isPending } = useModifyTreeItemMutation();

    const submitHandler = async () => {
        try {
            await mutateAsync({
                actionType: actionType as ActionType,
                name,
                nodeId: activeId as number,
            });
        } finally {
            closeModal();
        }
    };

    const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value);
    };

    return (
        <Dialog open onClose={closeModal}>
            <DialogTitle>{actionType}</DialogTitle>
            <DialogContent style={{ paddingTop: 8, minWidth: "320px" }}>
                {actionType === ActionType.DELETE ? (
                    <Typography>Do you want to delete {name}?</Typography>
                ) : (
                    <TextField
                        id="outlined"
                        label="Node Name"
                        value={name}
                        onChange={nameChangeHandler}
                        fullWidth
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeModal}>
                    Cancel
                </Button>
                <Button onClick={submitHandler} autoFocus loading={isPending}>
                    {actionType}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
