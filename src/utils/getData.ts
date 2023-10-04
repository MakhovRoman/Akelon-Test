type LoadedData = Promise<Record<string, string>>;

export const getData = async (url: string):LoadedData => {

  const {default: data} = await import(url);
  return data;
}
