import { validateNameNotBlank } from "../packages/YipAddress/validate/commonValidations"
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
        name: validateNameNotBlank(r, r => r.name)
    }
}
