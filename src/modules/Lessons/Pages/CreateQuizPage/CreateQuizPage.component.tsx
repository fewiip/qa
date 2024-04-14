import { Quiz, useLessons } from "../../api"
import { AppLayout } from '../../../../shared/components/AppLayout';
import { useParams } from "react-router-dom";
import { CenterCard } from '../../components/CenterCard/CenterCard.component';
import styles from './CreateQuizPage.module.css'

import { useState, useEffect } from "react";
import { CreateQuizCard } from "../../components/CreateQuizCard/CreateQuizCard.component";

export const CreateQuizPage = () => {
    
    let { chapterid } = useParams()
    

    return <AppLayout variant='grey'>
        <div className={styles.contentWrapper}>
        <CenterCard>
            {chapterid &&  <CreateQuizCard chapterID={parseInt(chapterid)}/>}
        </CenterCard>
        </div>
        
    </AppLayout>
}