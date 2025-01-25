export const isValidEmail = (value) =>
    value != null && value !== '' && /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(value)