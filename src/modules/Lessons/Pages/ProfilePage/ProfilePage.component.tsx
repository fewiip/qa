import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component"
import styles from './ProfilePage.module.css'
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook"
import { StatisticsCardBig } from "../../components/StatisticsCardBig/StatisticsCardBig.component"
import { UserCard } from "../../components/UserCard/UserCard.component"

export const ProfilePage = () => {
    const { user } = useAuthStore();
    console.log(user);
    return<>
      <div>
        <NavigationBar />
      </div>
      <UserCard/>
      <div className={styles.appLayoutWrapper}>
        

      

      <StatisticsCardBig/>
      <div>Conquistas</div>
    </div>

    </>
}