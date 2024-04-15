import { AppLayout } from '../../../../shared/components/AppLayout';
import { CenterCard } from '../../components/CenterCard/CenterCard.component';
import styles from './CoursePage.module.css'

export const CoursePage = () => {

    return <AppLayout page='courses' variant='white'>
        <div className={styles.contentWrapper}>
            <CenterCard>
                fssdds
            </CenterCard>
        </div>

    </AppLayout>
}