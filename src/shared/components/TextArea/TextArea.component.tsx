import { FunctionComponent } from "react";

import styles from './textArea.module.css'

interface TextAreaProps {

}

export const TextArea : FunctionComponent<TextAreaProps> = (props) => {
    return(
    <div className={styles.inputWrapper}>
      <textarea
        {...props}
        className={styles.input} 
      />
      
    </div>);
}