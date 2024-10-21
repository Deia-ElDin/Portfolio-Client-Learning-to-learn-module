export const formStyle = (errMsg, formErr, userFormOpaicty) => {
  return {
    backgroundColor: errMsg ? '#000' : `rgba(0, 0, 0, ${userFormOpaicty})`,
    boxShadow: formErr ? '5px 10px 12px #ff0000' : '5px 10px 12px #fff',
  };
};
