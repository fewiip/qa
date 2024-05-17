import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
/*import {  useAuth } from "../../../auth/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { toast } from "react-toastify";*/
import { CenterCard } from "../../components/CenterCard";
import { CenterContent } from "../../components/CenterContent";

import styles from './EditUserNamePage.module.css'

export const EditUserNamePage = () => {
  //const { user, setUserData } = useAuthStore();
  /*const { changePassword } = useAuth();
  const navigate = useNavigate();

  const [newFirstName, setnewFirstName] = useState('')
  const [newLastName, setnewLastName] = useState('')

  async function handleConfirmNewName() { 
    
    
  }
  */

    return (
        <AppLayout>
          <div>
            <NavigationBar variant="user" />
          </div>
          <div className={styles.contentWrapper}>
            <CenterContent>
            <CenterCard>
              <div>
                Nome Atual: {}
              </div>
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
            </CenterContent>
          </div>
        </AppLayout>
      );
}