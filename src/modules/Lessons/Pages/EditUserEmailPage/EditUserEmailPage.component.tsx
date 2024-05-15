import { AppLayout } from "../../../../shared/components/AppLayout";
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { CenterCard } from "../../components/CenterCard";

import styles from './EditUserEmailPage.module.css'

export const EditUserEmailPage = () => {

    /*
    {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": "string",
        "role": "USER",
        "bug": 0,
        "coin": 0,
        "refill": 0,
        "victory": 0,
        "enabled": true,
        "username": "string",
        "authorities": [
          {
            "authority": "string"
          }
        ],
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true
      }
    */
      return (
        <AppLayout>
          <div>
            <NavigationBar variant="user" />
          </div>
          <div className={styles.contentWrapper}>
            <CenterCard>
              <div>
                <a href="">Editar Nome</a>
              </div>
              <div>
                <a href="">Editar Email</a>
              </div>
              <div>
                <a href="">Editar Senha</a>
              </div>
            </CenterCard>
          </div>
        </AppLayout>
      );
}