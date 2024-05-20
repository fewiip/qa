import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { SignUpProps } from "../../api";
import styles from "./SignUpForm.module.css";
import { FunctionComponent, useEffect, useMemo, useState } from "react";

interface SignUpFormProps {
  onSubmit: (payload: SignUpProps) => void;
}

export const SignUpForm: FunctionComponent<SignUpFormProps> = (props) => {
  const { onSubmit } = props;
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit() {
    const formError = [];

    if (!firstName.length || firstName.length > 255) {
      formError.push("firstName");
    }

    if (!lastName.length || lastName.length > 255) {
      formError.push("lastName");
    }

    if (!password.length || password.length > 255) {
      formError.push("password");
    }

    if (!email.length || email.length > 255) {
      formError.push("email");
    }

    if (password !== confirmPassword) {
      formError.push("confirmPassword");
    }

    if (formError.length) {
      setErrors(formError);
      return;
    }

    onSubmit({ email, password, firstName, lastName });
  }

  useEffect(() => {
    setErrors((prev) => prev.filter((i) => i !== "password"));
  }, [confirmPassword, password]);

  const hasfirstNameError = useMemo(() => {
    return Boolean(errors.find((i) => i === "firstName"));
  }, [firstName, errors]);
  const hasLastNameError = useMemo(() => {
    return Boolean(errors.find((i) => i === "lastName"));
  }, [firstName, errors]);
  const hasEmailError = useMemo(() => {
    return Boolean(errors.find((i) => i === "email"));
  }, [firstName, errors]);
  const hasPasswordError = useMemo(() => {
    return Boolean(errors.find((i) => i === "password"));
  }, [confirmPassword, password, errors]);
  const hasConfirmPasswordError = useMemo(() => {
    return Boolean(errors.find((i) => i === "confirmPassword"));
  }, [confirmPassword, password, errors]);

  function handleLoginPage() {
    navigate("/login");
  }
  return (
    <div className={styles.loginCard}>
      <Input
        placeholder="Nome"
        type="text"
        value={firstName}
        onChange={(i) => setFirstName(i.target.value)}
        hasError={hasfirstNameError}
      />
      {hasfirstNameError && (
        <div className={styles.errorPasswordMessage}>Nome inválido</div>
      )}
      <Input
        placeholder="Sobrenome"
        type="text"
        value={lastName}
        onChange={(i) => setLastName(i.target.value)}
      />
      {hasLastNameError && (
        <div className={styles.errorPasswordMessage}>Sobrenome inválido</div>
      )}

      <Input
        placeholder="E-mail"
        type="text"
        value={email}
        onChange={(i) => setEmail(i.target.value)}
      />
      {hasEmailError && (
        <div className={styles.errorPasswordMessage}>Email inválido</div>
      )}

      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(i) => setPassword(i.target.value)}
        hasError={hasPasswordError}
      />
      {hasPasswordError && (
        <div className={styles.errorPasswordMessage}>Senha inválida</div>
      )}

      <Input
        placeholder="Confirmar senha"
        type="password"
        value={confirmPassword}
        onChange={(i) => setConfirmPassword(i.target.value)}
        hasError={hasPasswordError}
      />

      {hasConfirmPasswordError && (
        <div className={styles.errorPasswordMessage}>
          Ops! A senha e a confirmação de senha não coincidem. Por favor,
          verifique e tente novamente.
        </div>
      )}

      <Button onClick={handleSubmit}>Criar conta</Button>
      <Button onClick={handleLoginPage}>Já tenho uma conta</Button>
      {/*
      <div className={styles.politics}>
        Ao entrar no QA+ você concorda com nossos <a href="">Termos</a> e{" "}
        <a href="">Políticas de Privacidade</a>
      </div>
*/}
    </div>
  );
};
