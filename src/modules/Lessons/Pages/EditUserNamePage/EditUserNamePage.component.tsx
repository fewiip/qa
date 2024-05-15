import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { CenterCard } from "../../components/CenterCard";

import styles from './EditUserNamePage.module.css'

export const EditUserNamePage = () => {
    return (
        <AppLayout>
          <div>
            <NavigationBar variant="user" />
          </div>
          <div className={styles.contentWrapper}>
            <CenterCard>
              <div>
                <p>Nome:</p>
                <Input />
              </div>
              <div>
                <p>Sobrenome:</p>
              <Input />
              </div>
              <div>
                <Button>Confirmar</Button>
              </div>
            </CenterCard>
          </div>
        </AppLayout>
      );
}