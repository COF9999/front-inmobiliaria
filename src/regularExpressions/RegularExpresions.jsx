export function nameValidatation (){
    return /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ' -]{5,40}$/
}

export function nameUserValidation(){
    return /^[a-zA-Z0-9_]{1,40}$/
}

export function passwordValidation(){
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
}

export function conditionProductValidation(){
    return /^(10|[1-9])$/
}

export function priceValidation(min = 1000, max = 1000000) {
    const regexStr = `^(?:${min}|${max}|(?:${min.toString().slice(0, -1)}[${min.toString().slice(-1)}-9]|[${Math.floor(min / 10) + 1}-9][0-9]{0,${max.toString().length - 2}}|[1-9][0-9]{${max.toString().length - 1}}))$`;
    return new RegExp(regexStr);
}
