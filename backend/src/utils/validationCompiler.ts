export const validationCompiler = ({ schema, method, url, httpPart }) => {
  return (data) => (schema as any).validate(data);
};
