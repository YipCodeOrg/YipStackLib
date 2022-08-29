import { inverseIndexDuplicatesMap } from "../packages/YipAddress/util/arrayUtil"
import { EmptyValidationResult, newEmptyValidationResult, ValidationResult } from "../packages/YipAddress/validate/validation"

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
    name: ValidationResult
}

export const EmptyRegistrationValidationResult: RegistrationValidationResult= {
    name: EmptyValidationResult
}

export function validateRegistrations(rs: Registration[]): RegistrationsValidationResult{
    const topValidationResult = validateTopLevel(rs)
    const itemValidations = validateItems(rs)
    return {
        topValidationResult,
        itemValidations
    }
}
function validateItems(rs: Registration[]): RegistrationValidationResult[]{
    return rs.map(r => validateRegistration(r))
}

function validateTopLevel(_: Registration[]): ValidationResult{
    const validation = newEmptyValidationResult()
    return validation
}

export function validateRegistration(r: Registration): RegistrationValidationResult{
    return {
        name: validateName(r)
    }
}

function validateName(r: Registration): ValidationResult{
    const validation = newEmptyValidationResult()
    if(!r.name){
        validation.errors.push("Name must not be blank")
    }
    return validation
}

