export const handleExperience = () => {
  let unit;
  let duration;

  function convertDateForIos(date) {
    let arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  }

  const startingDate = convertDateForIos('2021-11-1 00:00:00').getTime();
  const currentDate = new Date().getTime();

  const expInMonths = Math.floor(
    (currentDate - startingDate) / 1000 / 30 / 60 / 60 / 24
  );

  if (expInMonths > 12) {
    const expInYears = expInMonths / 12;
    const diff = expInYears - Math.floor(expInYears);
    duration = diff >= 0.5 ? Math.ceil(expInYears) : Math.floor(expInYears);

    if (expInYears <= 1) {
      unit = 'Year';
    } else {
      unit = 'Years';
    }
  } else {
    duration = expInMonths;
    unit = 'Months';
  }

  return `${duration} ${unit}`;
};
