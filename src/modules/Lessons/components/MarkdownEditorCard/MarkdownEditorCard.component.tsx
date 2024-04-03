import { FunctionComponent } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";

interface MarkdownEditorCardProps {

}

export const MarkdownEditorCard: FunctionComponent<MarkdownEditorCardProps> = (props) => {
    return <>
        <CenterCard>
            <div>
                <input type="text" />
            </div>
            <div>
                <textarea id="story" name="story">
                    It was a dark and stormy night...
                </textarea>

            </div>
        </CenterCard>
    </>
}