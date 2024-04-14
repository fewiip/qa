import { ChangeEventHandler, FunctionComponent } from "react";
import { RadioButton } from "../RadioButton/RadioButton.component";
import styles from './RadioGroup.module.css'

export type Option = {
  name: string
  label: string
  value: string | number
}

export interface RadioGroupProps {
  options: Option[]
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({ options, onChange }) => {
  return <>
    <div className={styles.radioWrapper}>
      {
        options.map((i) => <RadioButton name={i.name} label={i.label} value={i.value} key={i.value} onChange={onChange}/>)
      }
    </div>
  </>

}