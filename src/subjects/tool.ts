export class Tool {
    public random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public async sleep(ms: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    }

    // public is(): boolean {
        
    // }
}
