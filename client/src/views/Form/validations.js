// const validations = (activity) => {
//   const errors = {};

//   // Validar el nombre
//   if (!activity.name) {
//     errors.name = ' ';
//   } else if (!/^[A-Za-z\s]+$/.test(activity.name)) {
//     errors.name = 'Name can only contain letters and spaces.';
//   }

//   // Validar la dificultad
//   if (!activity.difficulty) {
//     errors.difficulty = 'Difficulty is required.';
//   }

//   // Validar la temporada
//   if (!activity.season) {
//     errors.season = 'Season is required.';
//   }

//   // Validar los países
//   if (!activity.countries || activity.countries.length === 0) {
//     errors.countries = 'At least one country is required.';
//   }

//   return errors;
// };

// export default validations;


// const validations = (activity) => {
//   const errors = {};

//   // Validar el nombre
//   if (!activity.name) {
//     errors.name = ' ';
//   } else if (!/^[A-Za-z\s]+$/.test(activity.name)) {
//     errors.name = 'Name can only contain letters and spaces.';
//   }

//   // Validar la dificultad
//   if (!activity.difficulty) {
//     errors.difficulty = 'Difficulty is required.';
//   }

//   // Validar la temporada
//   if (!activity.season) {
//     errors.season = 'Season is required.';
//   }

//   // Validar los países
//   if (!activity.countries || activity.countries.length === 0) {
//     errors.countries = 'At least one country is required.';
//   }

//   return errors;
// };

// export default validations;


const validations = (activity) => {
  const errors = {};

  if (!activity.name) {
    errors.name = "Required field";
  } else if (!/^[A-Za-z\s]+$/.test(activity.name)) {
    errors.name = "Name can only contain letters and spaces.";
  } else if (activity.name.length < 3) {
    errors.name = "The length can't be less than 3 words";
  }
  else if (activity.name.length > 20) {
    errors.name = "The length can't be more than 20 words";
  }

  if (!activity.difficulty) {
    errors.difficulty = "Difficulty is required.";
  } else if (!/^[0-9]+$/.test(activity.difficulty)) {
    errors.difficulty = "The difficulty can only be set in numbers.";
  } else if (activity.difficulty < 1 || activity.difficulty > 5) {
    errors.difficulty = "The difficulty range can only be from 1 to 5";
  }

  if (activity.duration > 24) {
    errors.duration = "The duration can't be more than 24 hours";
  }

  if (!activity.season) {
    errors.season = "Season is required.";
  }

  if (!activity.countries || activity.countries.length === 0) {
    errors.countries = "At least one country is required.";
  }

  return errors;
};

export default validations;

