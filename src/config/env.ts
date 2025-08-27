function getEnvVariable(key: string, required = true): string {
  const value = import.meta.env[key];
  if (required && !value) {
    throw new Error(`La variable de entorno ${key} es requerida y NO está definida`);
  }
  return value!;
}

const env = {
  URL_BACK_LOCAL: getEnvVariable('VITE_URL_BACK_LOCAL'),
  URL_BACK_DEPLOY: getEnvVariable('VITE_URL_BACK_DEPLOY'),
};

export default env;
