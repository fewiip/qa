import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Chapter, Quiz, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from './EditQuizCard.module.css'
import MDEditor from "@uiw/react-md-editor";
import { Button } from '../../../../shared/components/Button/Button.component';

interface EditQuizCardProps {
    quiz: Quiz
    chapterID: number
}

export const EditQuizCard: FunctionComponent<EditQuizCardProps> = (props) => {
    const {chapterID} = props
    const { quiz } = props 
    const { editQuiz } = useLessons()
    const navigate = useNavigate()
    
    console.log(quiz)

    const [quizName, setChapterName] = useState(quiz.name);
    const [quizText, setChapterText] = useState<string | undefined>(quiz.text);
    const [quizcorrectAnswer, setquizcorrectAnswer] = useState(quiz.correctAnswer);
    const [quizAnswer1, setquizAnswer1] = useState(quiz.answer[0]['text']);
    const [quizAnswer2, setquizAnswer2] = useState(quiz.answer[1]['text']);
    const [quizAnswer3, setquizAnswer3] = useState(quiz.answer[2]['text']);
    const [quizAnswer4, setquizAnswer4] = useState(quiz.answer[3]['text']);
    const [quizAnswer5, setquizAnswer5] = useState(quiz.answer[4]['text']);

    async function handleSubmit() {
        try {
            quiz.name = quizName
            quiz.text = quizText || ''
            
            quiz.correctAnswer = quizcorrectAnswer
            quiz.answer[0]['text'] = quizAnswer1
            quiz.answer[1]['text'] = quizAnswer2
            quiz.answer[2]['text'] = quizAnswer3
            quiz.answer[3]['text'] = quizAnswer4
            quiz.answer[4]['text'] = quizAnswer5
            


            console.log(quiz)
            const response = await editQuiz(quiz)
            console.log(response)

            navigate(`/chapter/${chapterID}/quiz/${quiz.id}`)
        } catch (error) {
            toast.error('Alguma coisa deu errado!')
        }
    }

    return <div data-color-mode="light">
        
            <div>
                <input type="text" value={quizName} onChange={(i) => setChapterName(i.target.value)} />
            </div>

            <MDEditor
                value={quizText}
                onChange={setChapterText}
                height='20%'
            />

            {/* {quiz.map(i => <div>i</div>)} */}
            <div>
                <p>Resposta correta:</p>
                <input type="text" value={quizcorrectAnswer}  onChange={(i) => setquizcorrectAnswer(parseInt(i.target.value))}/>
            </div>

            <div>
                <p>Resposta 1:</p>
                <input type="text" value={quizAnswer1}  onChange={(i) => setquizAnswer1(i.target.value)}/>
            </div>
            <div>
                <p>Resposta 2:</p>
                <input type="text" value={quizAnswer2}  onChange={(i) => setquizAnswer2(i.target.value)}/>
            </div>
            <div>
                <p>Resposta 3:</p>
                <input type="text" value={quizAnswer3} onChange={(i) => setquizAnswer3(i.target.value)} />
            </div>
            <div>
                <p>Resposta 4:</p>
                <input type="text" value={quizAnswer4}  onChange={(i) => setquizAnswer4(i.target.value)}/>
            </div>
            <div>
                <p>Resposta 5:</p>
                <input type="text" value={quizAnswer5}  onChange={(i) => setquizAnswer5(i.target.value)}/>
            </div>


            <div>
                
                <button>Adicionar questao</button>
            </div>

            {/* quiz.answer.map((i) => (

                <button>{i.text}</button>
                <input type="text" value={quizAnswer1} onChange={(i) => setChapterName(i.target.value)}  />
                

            ))} */}

            <div>
            <Button style={{ padding: '16px', borderRadius: '8px', fontSize: '12px'}} onClick={handleSubmit}>Salvar</Button>
                
                
            </div>
 
    </div >
}