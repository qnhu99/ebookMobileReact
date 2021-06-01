export const addRecent = payload => {
  return { type: 'add_react', payload };
};

export const resetRecent = () => {
  return { type: 'reset_react' };
};
