// utils/validation.ts
export const PHONE_REGEX = /^\\+?[1-9]\\d{1,14}$/;

type FieldRules = {
  [key: string]: (value: string) => string;
};

// Global rules for all fields
const rules: FieldRules = {
  name: (value: string) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  },
  phoneNumber: (value: string) => {
    if (!value.trim()) return "Phone number is required";
    if (!PHONE_REGEX.test(value))
      return "Enter a valid phone number (+14155552671)";
    return "";
  },
  email: (value: string) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";
    return "";
  },
  // Product validation rules
  storage: (value: string) => {
    if (!value.trim()) return "Storage is required";
    return "";
  },
  price: (value: string) => {
    if (!value.trim()) return "Price is required";
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0)
      return "Price must be a positive number";
    return "";
  },
  barcode: (value: string) => {
    if (!value.trim()) return "Barcode is required";
    if (value.trim().length < 3) return "Barcode must be at least 3 characters";
    return "";
  },
  condition: (value: string) => {
    if (!value.trim()) return "Condition is required";
    return "";
  },
  color: (value: string) => {
    if (!value.trim()) return "Color is required";
    return "";
  },
  category: (value: string) => {
    if (!value.trim()) return "Category is required";
    return "";
  },
};

// Generic validation function
export const validateField = (field: string, value: string) => {
  const rule = rules[field];
  if (!rule) return ""; // No rule defined for this field
  return rule(value);
};

// Validate all fields in an object
export const validateAllFields = (
  data: Record<string, any>,
  requiredFields: string[]
) => {
  const errors: Record<string, string> = {};

  requiredFields.forEach((field) => {
    const error = validateField(field, String(data[field] || ""));
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
