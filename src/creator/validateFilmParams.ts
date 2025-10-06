export function validateFilm(film: any): { valid: boolean; error?: string } {
  if (!film) {
    return { valid: false, error: "film object is required" };
  }

  const validations = [
    { field: "film", type: "string", required: true },
    { field: "filmUID", type: "string", required: true },
    { field: "creatorUID", type: "string", required: true },
    { field: "targetCities", type: "array", required: true, nonEmpty: true },
    { field: "date", type: "string", required: true },
    { field: "time", type: "string", required: true },
    { field: "runTimeMins", type: "string", required: true },
    { field: "genre", type: "string", required: true },
    { field: "trailer", type: "string", required: true },
    { field: "coverImage", type: "string", required: true },
    { field: "description", type: "string", required: true },
    { field: "cast", type: "array", required: true, nonEmpty: true },
    { field: "otherImages", type: "array", required: true },
  ];

  for (const validation of validations) {
    if (validation.required && !(validation.field in film)) {
      return {
        valid: false,
        error: `Missing required field: ${validation.field}`,
      };
    }

    const value = film[validation.field];

    if (validation.type === "string") {
      if (typeof value !== "string" || value.trim() === "") {
        return {
          valid: false,
          error: `${validation.field} must be a non-empty string`,
        };
      }
    }

    if (validation.type === "array") {
      if (!Array.isArray(value)) {
        return { valid: false, error: `${validation.field} must be an array` };
      }
      if (validation.nonEmpty && value.length === 0) {
        return {
          valid: false,
          error: `${validation.field} must be a non-empty array`,
        };
      }
    }
  }

  return { valid: true };
}
