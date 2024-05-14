import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import styles from "./UserPage.module.css";
//import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { BigStatisticsCard } from "../../components/BigStatisticsCard/BigStatisticsCard.component";
import { BigUserCard } from "../../components/BigUserCard/BigUserCard.component";
import { BigAchievementsCard } from "../../components/BigAchievementsCard/BigAchievementsCard.component";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent";

export const UserPage = () => {
  //const { user } = useAuthStore();
  //console.log(user);
  return (
    <AppLayout>
      <div>
        <NavigationBar variant="user" />
      </div>
      <div className={styles.contentWrapper}>
        <CenterContent>
          <BigUserCard />
          <BigStatisticsCard />
          <BigAchievementsCard />
        </CenterContent>
      </div>
    </AppLayout>
  );
};
