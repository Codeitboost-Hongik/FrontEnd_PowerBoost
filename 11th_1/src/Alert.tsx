import { ReactNode } from "react";
import styles from "./Alert.module.css";

interface Props {
  level?: "info" | "warn";
  children: ReactNode;
}

export default function Alert({ level = "info", children }: Props) {
  return <div className={`${styles.alert} ${styles[level]}`}>{children}</div>;
}
