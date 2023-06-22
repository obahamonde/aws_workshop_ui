export const useJson = () => {
  const loads = (data: string) => {
    return JSON.parse(data);
  };
  const dumps = (data: Object) => {
    return JSON.stringify(data);
  };
  return {
    loads,
    dumps,
  };
};
