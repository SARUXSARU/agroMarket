export class Ad{
    constructor(_id,title,price,description,adLocation,image,category){
        this._id=_id;
        this.title=title;
        this.price=price;
        this.description=description;
        this.adLocation=adLocation;
        this.image=image || './icons/image.png';
        this.category=category;
    }
}