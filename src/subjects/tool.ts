export class Tool {
    public random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // public is(): boolean {
        
    // }
}
