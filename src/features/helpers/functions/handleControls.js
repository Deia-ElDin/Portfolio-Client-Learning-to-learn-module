export const setClass = ({
  btnName,
  activeBtn,
  username,
  displayLoginForm,
}) => {
  if (btnName === 'login') {
    if (username || displayLoginForm) return 'active-login';
    else return 'control-btn';
  } else if (btnName === 'logout' && !username) {
    return 'disable-logout';
  } else if (
    btnName === 'details' ||
    btnName === 'project' ||
    btnName === 'contacts'
  ) {
    if (activeBtn === btnName) return 'active-multi-btn';
    else return 'multi-btn';
  } else if (activeBtn === btnName) {
    return 'active-btn';
  } else return 'control-btn';
};

export const setDisabled = ({ username, btnName }) => {
  if (username && btnName === 'login') return true;
  else if (!username && btnName === 'logout') return true;
  else return false;
};

export const setTitle = (btnName) => {
  let capIndex;
  let title = '';

  for (let i = 0; i < btnName.length; i++) {
    if (btnName[i] === btnName[i].toUpperCase()) capIndex = i;
  }

  for (let i = 0; i < btnName.length; i++) {
    title += i === capIndex ? ` ${btnName[i]}` : btnName[i];
  }

  return `${title[0].toUpperCase()}${title.substring(1)}`;
};
