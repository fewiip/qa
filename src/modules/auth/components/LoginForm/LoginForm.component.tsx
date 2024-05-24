import { Input } from "../../../../shared/components/Input";
import styles from "./LoginForm.module.css";
import { FunctionComponent, useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

// Separar em um arquivo proprio

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const { onSubmit } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    onSubmit(email, password);
  }

  return (
    <div className={styles.loginCard}>
      <Input
        placeholder="E-mail"
        type="text"
        value={email}
        onChange={(i) => setEmail(i.target.value)}
      />{" "}
      {/* transformar em componente */}
      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(i) => setPassword(i.target.value)}
      />{" "}
      {/* transformar em componente */}
      <button className={styles.button} onClick={handleSubmit}>
        Entrar
      </button>
      {/*
      <div className={styles.politics}>
        Ao entrar no QA+ você concorda com nossos <a href="">Termos</a> e <a href="">Políticas de Privacidade</a>
      </div>
      */}
    </div>
  );
};
