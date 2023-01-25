import { writable } from "svelte/store";

import { textFR } from "./textFR";
import { textEN } from "./textEN";

export const lang = writable(textFR);
export const translation = (langCode: string) => {
    if (langCode === "en") lang.set(textEN);
    else lang.set(textFR);
}

