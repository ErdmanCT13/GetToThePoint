export function getDatabaseUrl(username: string, password: string, host: string, database: string): string {
    return `postgresql://${username}:${password}@${host}/${database}?sslmode=require`
}