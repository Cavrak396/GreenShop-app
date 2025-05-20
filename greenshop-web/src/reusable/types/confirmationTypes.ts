import { Dispatch, SetStateAction } from "react";

export interface ConfirmationTypes {
    message?: string;
    setIsAppear: Dispatch<SetStateAction<boolean>>;
    setOnConfirmAction?: Dispatch<SetStateAction<(() => void) | null>>;
}

export type ConfirmationProps = ConfirmationTypes & {
    onConfirmAction: (() => void) | null;
};
