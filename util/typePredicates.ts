export function isSimpleProperty(obj: any, property: PropertyKey){
    const desc = Object.getOwnPropertyDescriptor(obj, property)
    if(!!desc){
        return (!desc.get && !desc.set)
    }
    return false
}

export function isStringArray(obj: any): obj is string[]{
    if(!Array.isArray(obj)){
        return false
    }
    return(areStrings(obj))
}

function areStrings(objs: any[]): objs is string[]{
    for(const obj of objs){
        if(!isString(obj)){
            return false
        }
    }
    return true
}

export function isString(obj: any): obj is string{
    return (typeof obj === 'string' || obj instanceof String)
}