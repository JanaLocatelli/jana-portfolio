const THEME_KEY = "darkMode";

export function saveDarkMode(value: boolean){
    try {
        localStorage.setItem(THEME_KEY, JSON.stringify(value));
    } catch (e) {
        console.error("Error saving dark mode preference", e);
    }
}

export function getDarkMode(): boolean{
    try {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === null) return false; // default light mode
        return JSON.parse(stored);
    } catch (e) {
        console.error("Error retrieving dark mode preference", e);
        return false;
    }
}