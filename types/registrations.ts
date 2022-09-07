import { liftFieldValidationToItemValidation, validateItemResultArray, validateNameNotBlank, validateUniqueStr } from "../packages/YipAddress/validate/commonValidations"
import { ArrayValidationResult, ItemValidationResult, newEmptyValidationResult, ValidationResult, ValidationSeverity } from "../packages/YipAddress/validate/validation"

export type Registration = {
    name: string,
    hyperlink?: string,
    addressLastUpdated: Date
}

export function isRegistrationUpToDate(registration: Registration, date: Date){
    return registration.addressLastUpdated > date
}

export type RegistrationsValidationResult = ArrayValidationResult<RegistrationValidationResult>

export type RegistrationValidationResult = ItemValidationResult<RegistrationFieldValidationResult>

export type RegistrationFieldValidationResult = {
    name: ValidationResult
}

export const EmptyRegistrationValidationResult: RegistrationValidationResult = {
    flatValidation: newEmptyValidationResult(),
    fieldValidations: {
        name: newEmptyValidationResult()
    }    
}

export function validateRegistrations(rs: Registration[]): RegistrationsValidationResult{    
    return validateItemResultArray(rs, validateRegistration, validateTopLevelRegistrations)
}

const validateRegistration = liftFieldValidationToItemValidation(fieldValidateRegistration)

function validateTopLevelRegistrations(topValidationResult: ValidationResult, rs: Registration[], 
    itemValidations: RegistrationValidationResult[]){
    validateUniqueStr(topValidationResult, rs, r => r.name, itemValidations, v => v.fieldValidations.name, ValidationSeverity.ERROR, "Name")
}

export function fieldValidateRegistration(r: Registration): RegistrationFieldValidationResult{
    return {
        name: validateNameNotBlank(r, r => r.name)
    }
}
