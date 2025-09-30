import { useState, useEffect } from "react";

// Este hook recebe um valor e um tempo de atraso (delay)
export function useDebounce<T>(value: T, delay: number): T {
  // Estado para armazenar o valor "atrasado"
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Cria um temporizador que só atualizará o 'debouncedValue'
    // após o 'delay' especificado (ex: 500ms)
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o temporizador se o 'value' mudar (ex: usuário digitou outra letra)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Roda o efeito novamente apenas se o valor ou o delay mudarem

  return debouncedValue;
}
