import styles from './QuizPage.module.css'
import { Quiz, useLessons } from "../../api"
import { QuizCard } from "../../components/QuizCard/QuizCard.component"
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppLayout } from '../../../../shared/components/AppLayout';
import { CenterCard } from '../../components/CenterCard/CenterCard.component';

export const QuizPage = () => {
    const { quizid } = useParams()
    const { lessonid } = useParams()

    const { getQuiz } = useLessons();
    const [quiz, setQuiz] = useState<Quiz>();

    async function fetchQuiz() {
        const response = await getQuiz(parseInt(quizid as string));
        setQuiz(response.data)
    }

    useEffect(() => {
        fetchQuiz()
    }, [])



    return <AppLayout variant='grey'>
        <div className={styles.contentWrapper}>
        <CenterCard>
            {quiz && lessonid && <QuizCard quiz={quiz} lessonID={parseInt(lessonid as string)}/>}
        </CenterCard>
        </div>
        
    </AppLayout>

}