import { FunctionComponent } from "react"
import styles from './QuizCard.module.css'
import { Quiz } from "../../api"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks";
import professor1_happy from "../../../../assets/images/professor1_happy.png"
import graph from "../../../../assets/images/graph.png"

interface QuizCardProps {
    quiz: Quiz
}

export const QuizCard: FunctionComponent<QuizCardProps> = (props) => {
    const { quiz } = props

    const correct_anwser = quiz.correctAnswer;


    return <>
        <div className={styles.quizWrapper}>
            <div className={styles.imageTextWrapper}>
                <div className={styles.profImage}>
                    <img src={professor1_happy} alt="" />
                </div>
                <div className={styles.quizText}>
                    <div className={styles.quizTitle}>
                        <h2>{quiz.name}</h2>
                    </div>

                    <div>
                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                            {quiz.text}
                        </ReactMarkdown>
                        <img src={graph} alt="" />
                    </div>
                </div>
            </div>

            <div className={styles.answers}>{quiz.answer.map((i) => (

                <button>{i.text}</button>

            ))}</div>
            <div>
                <button>Verificar</button>
            </div>
        </div>
    </>
}