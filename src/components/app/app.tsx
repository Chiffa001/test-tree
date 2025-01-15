import { QueryClientProvider } from "@tanstack/react-query";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { queryClient } from "@/api/query-client";
import { Tree } from "../tree";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export const App = () => (
    <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Tree />
        </QueryClientProvider>
    </ThemeProvider>
);
