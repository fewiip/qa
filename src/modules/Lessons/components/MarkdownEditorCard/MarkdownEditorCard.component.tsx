import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Chapter, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './MarkdownEditorCard.module.css'
import MDEditor from "@uiw/react-md-editor";


interface MarkdownEditorCardProps {
    chapter: Chapter
}

export const MarkdownEditorCard: FunctionComponent<MarkdownEditorCardProps> = (props) => {
    const { chapter } = props
    const { putChapter } = useLessons()
    const navigate = useNavigate()

    const  [ questoes, setQuestoes] = useState([]);

    const [chapterName, setChapterName] = useState(chapter?.name);
    const [chapterText, setChapterText] = useState<string | undefined>(chapter?.text);


    async function handleSubmit() {
        try {
            chapter.name = chapterName
            chapter.text = chapterText || ''

            console.log(chapter)
            const response = await putChapter(chapter)


            navigate(`/chapter/${chapter.id}`)
        } catch (error) {
            toast.error('Alguma coisa deu errad!')
        }
    }

    return <div data-color-mode="light">
        <CenterCard>
            <div>
                <input type="text" value={chapterName} onChange={(i) => setChapterName(i.target.value)} />
            </div>

            <MDEditor
                value={chapterText}
                onChange={setChapterText}
                height='100%'
            />

            {/* {quiz.map(i => <div>i</div>)} */}

            

            <div>
                <button onClick={handleSubmit}>
                    Salvar
                </button>
            </div>
        </CenterCard>
    </div >
}