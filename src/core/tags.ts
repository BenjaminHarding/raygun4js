export class Tags {
    private tags: string[];

    public setTags(tags:string[]) {
        this.tags = tags;
    }

    public getTags() {
        return [ ...this.tags ];
    } 
}