import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component"
import styles from './UserPage.module.css'
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook"
import { BigStatisticsCard } from "../../components/BigStatisticsCard/BigStatisticsCard.component"
import { BigUserCard } from "../../components/BigUserCard/BigUserCard.component"
import { BigAchievementsCard } from "../../components/BigAchievementsCard/BigAchievementsCard.component"
import { AppLayout } from '../../../../shared/components/AppLayout';

export const UserPage = () => {
    const { user } = useAuthStore();
    console.log(user);
    return <AppLayout >
      <div>
        <NavigationBar />
      </div>
      <div className={styles.contentWrapper}>
      <BigUserCard/>
      <BigStatisticsCard/>
      <BigAchievementsCard/>
      </div>
      </AppLayout>
}