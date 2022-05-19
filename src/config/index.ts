

export default class ConfigService {
    get(varName: string) : string | undefined{
        return process.env?.[varName] ? process.env[varName] : undefined
    }
}