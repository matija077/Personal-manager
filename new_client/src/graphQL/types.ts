export type contextDataType<queryType> =  {
    [key: string]: queryType
} | undefined

export type contextType<queryType> = {
    loading: boolean,
    error: any,
    data: contextDataType<queryType>
} | null

export type contextPresentationType = {
    loading: boolean,
    error: any,
}

export type queryDataType = {
    [key: string]: any
} | undefined

export type graphQLResponseType<queryType> = {
    loading: boolean,
    error?: any,
    data: queryType | undefined
}


export type quoteType = {
    author?: String
    text: String
}
export type quotesType = Array<quoteType>;

export type taskType = {
    name: String,
    category: String,
    description?: String,
    location?: String
}
export type tasksType = Array<taskType>;

export type userType = {
    nickname?: string,
    email?: string,
    name?: string,
    surname?: string,
    id?: string
};