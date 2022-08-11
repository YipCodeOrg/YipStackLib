export const logAndReturnRejectedPromise = (msg: string) => {
    console.error(msg)
    return Promise.reject(msg)
}

export const logAndReject = (reject: (reason?: any) => void, msg: string) => {
    console.error(msg)
    reject(msg)
}

export const serialize = function(obj: any) {
    return JSON.stringify(obj)
}

export function sortByKeyFunction<TKey, TData>(sortArray: TKey[], dataArray: TData[], keyMapper: (data: TData) => TKey): TData[]{
    
    const keyDataIndexMap = inverseIndexMap(dataArray, keyMapper)
    const usedIndices = new Set<number>()
    const resultArray: TData[] = []

    // Main sort
    for(let key of sortArray){
        if(keyDataIndexMap.has(key)){
            const index = keyDataIndexMap.get(key)
            if(index === undefined){
                throw new Error("Unexpected undefined index encountered during main sort");
            }
            const data = index === undefined ? undefined : dataArray[index]
            if(data === undefined){
                throw new Error("Unexpected undefined data encountered");
            }
            usedIndices.add(index)
            resultArray.push(data)
        }
    }

    // Append stragglers, if any
    if(dataArray.length !== usedIndices.size){
        for (let index = 0; index < dataArray.length; index++) {        
            if(!usedIndices.has(index)){
                const data = dataArray[index];
                if(data === undefined){
                    throw new Error("Unexpected undefined data encountered during append stragglers");
                }
                resultArray.push(data)
            }
        }
    }

    return resultArray
}
export function inverseIndexMap<TKey, TData>(a: TData[], keyMapper: (data: TData) => TKey) : Map<TKey, number>{
    const keyDataIndexMap = new Map<TKey, number>()

    for (let index = 0; index < a.length; index++) {
        const data = a[index];
        if(data === undefined){
            throw new Error("Unexpected undefined data encountered during map building");
        }
        const key = keyMapper(data)
        if(keyDataIndexMap.has(key)){
            throw new Error("Duplicate key found");            
        }
        keyDataIndexMap.set(key, index)
    }

    return keyDataIndexMap
}

export function inverseDataMap<TKey, TData>(a: TData[], keyMapper: (data: TData) => TKey) : Map<TKey, TData>{
    function getValueAtIndex(i: number){
        const val = a[i]
        if(val === undefined){
            throw new Error("Unexpected undefined element indexing array");            
        }
        return val
    }
    const invIndexMap = inverseIndexMap(a, keyMapper)
    return mapMap(invIndexMap, (k, i) => [k, getValueAtIndex(i)])
}

function mapMap<TKI, TVI, TKO, TVO>(map: Map<TKI, TVI>,
        f: (k: TKI, v: TVI, m: Map<TKI, TVI>) => [TKO, TVO]) : Map<TKO, TVO>{
    return new Map([...map].map(p => f(p[0], p[1], map)))
}
