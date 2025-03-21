export const regularExps = {
    email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password:
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    phone: /^[1-9]\d{8}$/,
    number: /^[0-9]+$/,
    hoursAndMinutes: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
    price: /^\$?\d+\.\d{2}$/,
    date: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    text: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/
}
export class RegularExpressions {
    get ExpPassword(): RegExp {
        return regularExps.password
    }

    static validateEmail(email: string): boolean {
        const isValid = regularExps.email.test(email)
        return isValid
    }
    static validatePassword(password: string): boolean {
        const isValid = regularExps.password.test(password)
        return isValid
    }
    static validatePhone(phone: string): boolean {
        const isValid = regularExps.phone.test(phone)
        return isValid
    }
    static validateNumber(number: string): boolean {
        const isValid = regularExps.number.test(number)
        return isValid
    }
    static validateDateFormat(dateStr: string): boolean {
        if (!regularExps.date.test(dateStr)) {
            return false
        }
        const date = new Date(dateStr)
        return date instanceof Date && !isNaN(date.getTime())
    }
}