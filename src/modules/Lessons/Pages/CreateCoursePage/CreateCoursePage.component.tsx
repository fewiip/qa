import { AppLayout } from "../../../../shared/components/AppLayout"
import { useState, useEffect } from "react";
import { CreateCourseCard } from "../../components/CreateCourseCard/CreateCourseCard.component";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from './CreateCoursePage.module.css'

export const CreateCoursePage = () => {
    const { user } = useAuthStore();

    return <AppLayout variant='white' page="courses">
      <div className={styles.contentWrapper}>
        {user && <CreateCourseCard userid={user?.id}  /> }
      </div>
    </AppLayout>
}
