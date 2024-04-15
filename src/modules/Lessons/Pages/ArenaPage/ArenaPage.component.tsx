import { AppLayout } from '../../../../shared/components/AppLayout';
import { CenterCard } from '../../components/CenterCard/CenterCard.component';
import styles from './ArenaPage.module.css'
export const ArenaPage = () => {
    return <AppLayout page='arena' variant='white'>
    <div className={styles.contentWrapper}>
    <CenterCard>
        Funcionalidade de Arena não disponível no momento 
    </CenterCard>
    </div>
    
</AppLayout>
}