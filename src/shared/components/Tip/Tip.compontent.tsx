import { FunctionComponent, ReactNode } from "react";

interface TipProps {
    children: ReactNode
}

export const Tip : FunctionComponent<TipProps> = (props) => {
    const {children} = props
    return <>
    <div>
        <b>Dica:</b>
        {children}
    </div></>
}