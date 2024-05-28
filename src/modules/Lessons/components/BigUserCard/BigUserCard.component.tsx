import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from "./BigUserCard.module.css";
import avatar_colored from "../../../../assets/images/avatar_colored.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";
import { useLessons } from "../../api";
import { toast } from "react-toastify";

export const BigUserCard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { deleteUser } = useLessons();

  function editUser() {
    navigate("edit/");
  }

  function handleDeleteUser() {
    if (user) {
      try {
        const response = deleteUser(user.id);
        console.log(response);
        logout();
        navigate("/login");
      } catch (error) {
        toast.error("Alguma coisa deu errado");
        console.log(error);
      }
    }
  }

  function onExit() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <div className={styles.userCard}>
        <div className={styles.imgAndInfo}>
          <div className={styles.userAvatar}>
            <img src={avatar_colored} alt="" />
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {user?.firstName} {user?.lastName}{" "}
            </div>
            {/*
                <div className={styles.userRole}>QA Master</div>
                */}
            <div className={styles.buttons}>
              <Button onClick={editUser}>Atualizar dados</Button>
              <Button onClick={handleDeleteUser}>Excluir conta</Button>
            </div>
          </div>
        </div>

        <div>
          <Button onClick={onExit}>Sair</Button>
        </div>
      </div>
    </>
  );
};
