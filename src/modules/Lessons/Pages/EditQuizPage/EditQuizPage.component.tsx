import { Quiz, useLessons } from "../../api"
import { AppLayout } from '../../../../shared/components/AppLayout';
import { useParams } from "react-router-dom";
import { CenterCard } from '../../components/CenterCard/CenterCard.component';
import styles from './EditQuizPage.module.css'
import { EditQuizCard } from '../../components/EditQuizCard/EditQuizCard.component';
import { useState, useEffect } from "react";

export const EditQuizPage = () => {
    const { quizid, courseid } = useParams()
    let { lessonid } = useParams()

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
            {lessonid && courseid && quiz && <EditQuizCard courseid={parseInt(courseid)} quiz={quiz} lessonID={parseInt(lessonid)}/>}
        </CenterCard>
        </div>
        
    </AppLayout>
}