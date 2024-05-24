import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api";
import { LoginForm } from "../../components/LoginForm";
import { useAuthStore } from "../../stores/useAuthStore.hook";
import styles from "./LoginPage.module.css";
import { RouteList } from "../../../../routes/router";
import background from "../../../../assets/images/background.png";
import { Button } from "../../../../shared/components/Button/Button.component";
import qa_logo from "../../../../assets/images/qatransparent.png";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const { login } = useAuth();
  const { setToken } = useAuthStore();
  const { setUserData } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(email: string, password: string) {
    try {
      const response = await login(email, password);

      setToken(response.data.token);
      setUserData(response.data.user);

      navigate(RouteList.LESSONS);
    } catch (error) {
      //alert("usuario ou senha incorreto");
      toast.error("E-mail ou senha incorretos!");
    }
  }

  function handleCreateAccount() {
    console.log(RouteList.SIGNUP);
    navigate(RouteList.SIGNUP);
  }

  return (
    <>
      <div className={styles.loginWrapper}>
        <div
          className={styles.imageSide}
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className={styles.parent}>
            <div className={styles.description}>
              <center>
                <b>
                  A forma divertida de aprender e ensinar sobre testes e
                  qualidade de software!
                </b>
              </center>
            </div>

            <div className={styles.imageconteiner}>
              <img src={qa_logo} alt="" />
            </div>
          </div>
        </div>

        <div className={styles.formSide}>
          <div className={styles.floatButton}>
            <Button onClick={handleCreateAccount}>Criar conta</Button>
          </div>
          <div className={styles.imgform}>
            <img src={qa_logo} alt="" />
          </div>
          <h1 className={styles.heading}>Entrar</h1>

          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};
