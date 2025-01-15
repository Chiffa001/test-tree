import { useErrorState } from "@/store";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const ErrorPlate = () => {
    const { error, removeError } = useErrorState();

    if (!error) {
        return null;
    }

    return (
        <Snackbar open autoHideDuration={6000} onClose={removeError}>
            <Alert
                onClose={removeError}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
            >
                {error}
            </Alert>
        </Snackbar>
    );
};
