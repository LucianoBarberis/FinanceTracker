import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme as toggleThemeAction } from "../redux/themeReducer";

export const useTheme = () => {
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    useEffect(() => {
        const body = document.body;
        if (theme === "dark") {
            body.classList.add("dark");
            body.classList.remove("light");
        } else {
            body.classList.add("light");
            body.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        dispatch(toggleThemeAction());
    };

    return { theme, toggleTheme };
};
