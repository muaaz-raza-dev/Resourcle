export const passwordValidation = (value: string) => {
    if(value.includes(" ")){
      return "password should not contain space"
    }
    if(!/[A-Z]/.test(value)){
      return "password should contain at least one uppercase letter"
    }
    if(!/[a-z]/.test(value)){
      return "password should contain at least one lowercase letter"
    }
    if(!/[0-9]/.test(value)){
      return "password should contain at least one number"
  }
  return true 
  }