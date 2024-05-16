import { AppLayout } from "../../../../shared/components/AppLayout";
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { CenterCard } from "../../components/CenterCard";

import styles from './EditUserPage.module.css';

export const EditUserPage = () => {
  return (
    <AppLayout>
      <div>
        <NavigationBar variant="user" />
      </div>
      <div className={styles.contentWrapper}>
        <CenterCard>
          <div>
            <a href="/user/name/edit">Editar Nome</a>
          </div>
          <div>
            <a href="/user/email/edit">Editar Email</a>
          </div>
          <div>
            <a href="/user/email/edit">Editar Senha</a>
          </div>
        </CenterCard>
      </div>
    </AppLayout>
  );
};
