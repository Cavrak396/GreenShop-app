import { Dispatch, SetStateAction } from "react";

export interface ConfirmationTypes {
    message?: string;
    setIsAppear: Dispatch<SetStateAction<boolean>>;
}
