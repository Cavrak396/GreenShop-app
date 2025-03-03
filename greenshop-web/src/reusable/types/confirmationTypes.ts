import { Dispatch, SetStateAction } from "react";

export interface ConfirmationTypes {
    message?: string;
    setIsAppear: Dispatch<SetStateAction<boolean>>;
    type?: string
}

export type ConfirmationButtonsProps = ConfirmationTypes & {
    onConfirmAction: (() => void) | null;
};