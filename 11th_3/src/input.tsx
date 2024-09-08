import { useState } from "react";

interface Props {
  className?: string;
  value?: string;
  onChange: any;
}

function Input({ className = "", value = "", onChange }: Props) {
  return <input className={className} value={value} onChange={onChange} />;
}

export default Input;
