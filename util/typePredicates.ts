export function isSimpleProperty(obj: any, property: PropertyKey){
    const desc = Object.getOwnPropertyDescriptor(obj, property)
    if(!!desc){
        return (!desc.get && !desc.set)
    }
    return false
}

export function isSimpleStringProperty(obj: any, property: PropertyKey){
    return isSimpleProperty(obj, property) && isString(obj[property])
}

export function areSimpleStringProperties(obj: any, properties: PropertyKey[]){
    return properties.every(prop => isSimpleStringProperty(obj, prop))
}

export function isString(obj: any){
    return (!!obj && (typeof obj === 'string' || obj instanceof String))
}

export function areStrings(objs: any[]): objs is string[]{
    for(const obj of objs){
        if(!isString(obj)){
            return false
        }
    }
    return true
}

export function isStringArray(obj: any): obj is string[]{
    if(!Array.isArray(obj)){
        return false
    }
    return(areStrings(obj))
}
