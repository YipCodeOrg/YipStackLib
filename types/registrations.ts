import { validateAndCollectItems, validateNameNotBlank, validateUniqueStr } from "../packages/YipAddress/validate/commonValidations"
import { collectValidations, newEmptyValidationResult, ValidationResult, ValidationSeverity } from "../packages/YipAddress/validate/validation"

export type Registration = {
    name: string,
    hyperlink?: string,
    addressLastUpdated: Date
}

export function isRegistrationUpToDate(registration: Registration, date: Date){
    return registration.addressLastUpdated > date
}

export type RegistrationsValidationResult = {
    topValidationResult: ValidationResult,
    itemValidations: RegistrationValidationResult[]
}

export type RegistrationValidationResult = {
    flatValidations: ValidationResult,
    fieldValidations: {
        name: ValidationResult
    }    
}

export const EmptyRegistrationValidationResult: RegistrationValidationResult = {
    flatValidations: newEmptyValidationResult(),
    fieldValidations: {
        name: newEmptyValidationResult()
    }    
}

export function validateRegistrations(rs: Registration[]): RegistrationsValidationResult{
    const topValidationResult = newEmptyValidationResult()
    const itemValidations = validateItems(rs, topValidationResult)
    validateTopLevel(topValidationResult, rs, itemValidations)
    return {
        topValidationResult,
        itemValidations
    }
}

function validateItems(rs: Registration[], topValidationResult: ValidationResult): RegistrationValidationResult[]{
    return validateAndCollectItems(rs, validateRegistration, v => v.flatValidations, topValidationResult)
}

function validateTopLevel(topValidationResult: ValidationResult, rs: Registration[], 
    itemValidations: RegistrationValidationResult[]){
    validateUniqueStr(topValidationResult, rs, r => r.name, itemValidations, v => v.fieldValidations.name, ValidationSeverity.ERROR, "Name")
}

export function validateRegistration(r: Registration): RegistrationValidationResult{
    const fieldValidations = {
        name: validateNameNotBlank(r, r => r.name)
    }

    return {
        flatValidations: collectValidations(fieldValidations),
        fieldValidations
    }
}

