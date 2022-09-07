import { validateNameNotBlank, validateUniqueStr } from "../packages/YipAddress/validate/commonValidations"
import { collectValidations, emptyValidationResult, mergeValidations, newEmptyValidationResult, ValidationResult, ValidationSeverity } from "../packages/YipAddress/validate/validation"

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

export function flatRegistrationsValidationResult(r: RegistrationsValidationResult | null): ValidationResult{
    if(r === null){
        return newEmptyValidationResult()
    }
    return mergeValidations([r.topValidationResult, ...r.itemValidations.map(collectValidations)])
}

export type RegistrationValidationResult = {
    name: ValidationResult
}

export const EmptyRegistrationValidationResult: RegistrationValidationResult = {
    name: emptyValidationResult
}

export function validateRegistrations(rs: Registration[]): RegistrationsValidationResult{
    const itemValidations = validateItems(rs)
    const topValidationResult = validateTopLevel(rs, itemValidations)
    return {
        topValidationResult,
        itemValidations
    }
}

function validateItems(rs: Registration[]): RegistrationValidationResult[]{
    return rs.map(r => validateRegistration(r))
}

function validateTopLevel(rs: Registration[], 
    itemValidations: RegistrationValidationResult[]): ValidationResult{
    const validation = newEmptyValidationResult()
    validateUniqueStr(validation, rs, r => r.name, itemValidations, v => v.name, ValidationSeverity.ERROR, "Name")
    return validation
}

export function validateRegistration(r: Registration): RegistrationValidationResult{
    return {
        name: validateNameNotBlank(r, r => r.name)
    }
}
