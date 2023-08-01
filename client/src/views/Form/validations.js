const validations = (activity) => {
  const errors = {};

  // Validar el nombre
  if (!activity.name) {
    errors.name = ' ';
  } else if (!/^[A-Za-z\s]+$/.test(activity.name)) {
    errors.name = 'Name can only contain letters and spaces.';
  }

  // Validar la dificultad
  if (!activity.difficulty) {
    errors.difficulty = 'Difficulty is required.';
  }

  // Validar la temporada
  if (!activity.season) {
    errors.season = 'Season is required.';
  }

  // Validar los países
  if (!activity.countries || activity.countries.length === 0) {
    errors.countries = 'At least one country is required.';
  }

  return errors;
};

export default validations;


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


// // const validations = ({ activity, setErrors, errors, property }) => {
// //   switch (property) {
// //     case "name":
// //   if (!activity.name) {
// //     setErrors({ ...errors, name: "Required field" });
// //   } else if (!/^[A-Za-z\s]+$/.test(activity.name)) {
// //     setErrors({ ...errors, name: "Name can only contain letters and spaces." });
// //   } else if (activity.name.length > 20) {
// //     setErrors({ ...errors, name: "The length can't be more than 20 words" });
// //   } 
// //   break;


// //     case "difficulty":
// //       if (!activity.difficulty) {
// //         setErrors({ ...errors, difficulty: "Difficulty is required." });
// //       } else if (!/^[0-9]+$/.test(activity.difficulty)) {
// //         setErrors({ ...errors, difficulty: "The difficulty can only be set in numbers." });
// //       } else if (activity.difficulty < 1 || activity.difficulty > 5) {
// //         setErrors({ ...errors, difficulty: "The difficulty range can only be from 1 to 5" });
// //       } else {
// //         setErrors({ ...errors, difficulty: "" });
// //       }
// //       break;

// //     case "duration":
// //       if (!/^[0-9]+$/.test(activity.duration)) {
// //         setErrors({ ...errors, duration: "The duration can only be set in numbers." });
// //       } else if (activity.duration > 24) {
// //         setErrors({ ...errors, duration: "The duration can't be more than 24 hours" });
// //       } else {
// //         setErrors({ ...errors, duration: "" });
// //       }
// //       break;

// //     case "season":
// //       if (!activity.season) {
// //         setErrors({ ...errors, season: "Season is required." });
// //       } else {
// //         setErrors({ ...errors, season: "" });
// //       }
// //       break;

// //     case "countries":
// //       if (!activity.countries || activity.countries.length === 0) {
// //         setErrors({ ...errors, countries: "At least one country is required." });
// //       } else {
// //         setErrors({ ...errors, countries: "" });
// //       }
// //       break;

// //     default:
// //       break;
// //   }
// // };

// // export default validations;
