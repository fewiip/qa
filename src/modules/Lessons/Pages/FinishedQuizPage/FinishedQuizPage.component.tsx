import { useParams } from "react-router-dom"

export const FinishedQuizPage = () => {
    const {lessonid } = useParams();

    return <AppLayout variant='grey'>
        <div className={styles.contentWrapper}>
        <CenterCard variant='withoutPadding' >
             Parabéns!
            
        </CenterCard>
        </div>
        
    </AppLayout>
}