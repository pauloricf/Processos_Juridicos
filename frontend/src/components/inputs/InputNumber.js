import React from "react";
import MaskedInput from "../MaskedInput";

const InputNumber = ({ control, name, mask, placeholder, rules, disabled }) => {
  return <MaskedInput control={control} name={name} mask={mask} placeholder={placeholder} rules={rules} disabled={disabled} />;
};
export default InputNumber;
