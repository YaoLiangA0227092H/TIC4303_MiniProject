function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (values.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    } else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
    } else if (!password_pattern.test(values.password.trim())) {
        error.password = "Password didn't match"
    } else {
        error.password = ""
    }

    return error
}

export default Validation