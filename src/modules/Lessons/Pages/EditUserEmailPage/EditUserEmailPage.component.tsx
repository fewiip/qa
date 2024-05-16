import { toast } from "react-toastify";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { CenterCard } from "../../components/CenterCard";

import styles from './EditUserEmailPage.module.css'
import { useState } from "react";

export const EditUserEmailPage = () => {
  const [email, setEmail] = useState('');

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
   function handleSubmit () {
    if(email === '') {
      toast.error("Email com campo nulo");
    }

   }
      return (
        <AppLayout>
          <div>
            <NavigationBar variant="user" />
          </div>
          <div className={styles.contentWrapper}>
            <CenterCard>
              <div>
                Insira o novo email:
              </div>
              <div>
                <Input placeholder="Novo email" value={email} onChange={(i) => setEmail(i.target.value)}/>
              </div>
              <div>
                <Button>Confirmar</Button>
              </div>
            </CenterCard>
          </div>
        </AppLayout>
      );
}