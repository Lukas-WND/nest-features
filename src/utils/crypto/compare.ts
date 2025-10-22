import * as bcrypt from 'bcrypt';

export async function compare(text: string, hash: string) {
    return await bcrypt.compare(text, hash);
}