type Emit = (...args: any[]) => any;
export type OneOrManyEmit = Emit[] | Emit;

export const handleOneOrManyEmits = (e: Event, callback?: OneOrManyEmit) => {
  if (!callback) return;

  if (Array.isArray(callback)) {
    callback.forEach(cb => {
      cb(e);
    });

    return;
  }

  callback(e);
};
