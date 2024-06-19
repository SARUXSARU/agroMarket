export class Ad{
    constructor(title,price,adLocation,image,category){
        this.title=title;
        this.price=price;
        this.adLocation=adLocation;
        this.image=image || './icons/wheat.png';
        this.category=category;
    }
}