import { EmptyValidationResult, ValidationResult } from "../packages/YipAddress/validate/validation"

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

function validateTopLevel(rs: Registration[]): ValidationResult{
    throw new Error("Function not implemented.")
}


export function validateRegistration(r: Registration): RegistrationValidationResult{
    throw new Error("Function not implemented.")
}
