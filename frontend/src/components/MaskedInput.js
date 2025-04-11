import React from "react";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

const MaskedInput = ({ control, name, mask, placeholder, rules, disabled }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...restField } }) => {
        // Se não houver máscara, renderiza um input normal com validação numérica
        if (!mask) {
          return (
            <input
              value={value || ""}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                onChange(rawValue);
              }}
              placeholder={placeholder}
              disabled={disabled}
              {...restField}
            />
          );
        }

        // Se houver máscara, usa o InputMask
        return (
          <InputMask
            mask={mask}
            value={value || ""}
            onChange={(e) => {
              // Remove todos os caracteres não numéricos antes de atualizar o valor
              const rawValue = e.target.value.replace(/\D/g, "");
              onChange(rawValue);
            }}
            disabled={disabled}
            {...restField}>
            {(inputProps) => <input {...inputProps} placeholder={placeholder} disabled={disabled} />}
          </InputMask>
        );
      }}
    />
  );
};

export default MaskedInput;
