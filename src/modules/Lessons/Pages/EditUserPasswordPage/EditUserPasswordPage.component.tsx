import { useState } from "react";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { NavigationBar } from "../../../../shared/components/NavigationBar/NavigationBar.component";
import { CenterCard } from "../../components/CenterCard";

import styles from "./EditUserPasswordPage.module.css";
import { CenterContent } from "../../components/CenterContent";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { SignUpProps, useAuth } from "../../../auth/api";
import { toast } from "react-toastify";

export const EditUserPasswordPage = () => {
  const [newPassword, setnewPassword] = useState("");
  const [confirmnewPassword, setconfirmnewPassword] = useState("");
  const { changePassword } = useAuth();
  const { user, setUserData } = useAuthStore();
  const navigate = useNavigate();

  async function handleConfirmNewPassword() {
    if (user) {
      if (newPassword === confirmnewPassword) {
        if (newPassword === "" || confirmnewPassword === "") {
          toast.error("Não pode ter senhas nulas");
        }else{

          try {
            const payload: SignUpProps = {
              firstName: user?.firstName,
              lastName: user?.lastName,
              email: user?.email,
              password: newPassword,
            };
            console.log(payload)
  
            const response = await changePassword(payload, user.id);
            console.log(response.data);
            setUserData(response.data);
            navigate("/user/edit/");
          } catch (error) {
            alert("alguma coisa deu errado");
          }
        }
      } else if (newPassword !== confirmnewPassword) {
        toast.error("senhas diferentes");
      } else if (newPassword === "" || confirmnewPassword === "") {
        toast.error("Não pode ter senhas nulas");
      }
    }
  }

  return (
    <AppLayout>
      <div>
        <NavigationBar variant="user" />
      </div>
      <div className={styles.contentWrapper}>
        <CenterContent>
          <CenterCard variant="withoutOverflow">
            <div>
              <p>Nova Senha:</p>
              <Input
                value={newPassword}
                type="password" 
                onChange={(i) => setnewPassword(i.target.value)}
              />
            </div>
            <div>
              <p>Confirmar Senha:</p>
              <Input
                value={confirmnewPassword}
                type="password" 
                onChange={(i) => setconfirmnewPassword(i.target.value)}
              />
            </div>
            <div>
              <Button onClick={handleConfirmNewPassword}>Confirmar</Button>
            </div>
          </CenterCard>
        </CenterContent>
      </div>
    </AppLayout>
  );
};
