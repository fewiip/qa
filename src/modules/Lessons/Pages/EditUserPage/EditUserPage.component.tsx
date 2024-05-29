import { useEffect, useState } from "react";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { useAuth } from "../../../auth/api";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { CenterCard } from "../../components/CenterCard";
import { CenterContent } from "../../components/CenterContent";

import styles from "./EditUserPage.module.css";
import { Button } from "../../../../shared/components/Button/Button.component";

export const EditUserPage = () => {
  const { user } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(false)

  const { transforToUser, transforToAdmin, getRole } = useAuth();

  async function fetchRole() {
    setIsAdmin(false);
    if (user ) {
      try {
        const response = await getRole(user?.id );
        setIsAdmin(response.data.isAdmin);
        console.log(response);
      } catch (error) {
        setIsAdmin(false);
      }
    }
  }

  async function handleTransformToUser() {
      
    if (user) {
      try {
        const response = await transforToUser(user?.id); 
        console.log(response);
        setIsAdmin(false);
      } catch (error) {
        setIsAdmin(true);
      }
    }
  }

  async function handleTransformToAdmin() {
    if (user) {
      try {
        const response = await transforToAdmin(user?.id); 
        console.log(response);
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
      }
    }
  }

  useEffect(() => { 
    fetchRole(); 
  }, []);

  return (
    <AppLayout>
      <div>
        <NavigationBar variant="user" />
      </div>
      <div className={styles.contentWrapper}>
        <CenterContent>
          <CenterCard variant="withoutOverflow">
            <div>
              <p>
                <b>Nome:</b> {user?.firstName} {user?.lastName}
              </p>

              <p>
                <b>Email:</b> {user?.email}
              </p>

              <p>ID: {user?.id}</p>
              <p>Cargo: {isAdmin && <>Gestor de turma</>} {!isAdmin && <>Aluno</>}</p>
            </div>
            <div>
              <a href="/user/password/edit">Editar Senha</a>
            </div>
            <div>
              {!isAdmin && <Button onClick={handleTransformToAdmin}>Transformar em gestor de turma</Button>}

              {isAdmin && <Button onClick={handleTransformToUser}>Transformar em aluno</Button>}
            </div>
            {/*
            <div>
              <a href="/user/name/edit">Editar Nome</a>
            </div>
            <div>
              <a href="/user/email/edit">Editar Email</a>
            </div>
            */}
          </CenterCard>
        </CenterContent>
      </div>
    </AppLayout>
  );
};
