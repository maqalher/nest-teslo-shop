import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'products'})
export class Product {

    @ApiProperty({
        example: '0a4f8580-b0b0-4cc6-a743-dbb3c592e8d2',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ApiProperty({
        example: "Men's Haha Yes Tee",
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title!: string;

    @ApiProperty({
        example: 35,
        description: 'Product Price',
    })
    @Column('float', {
        default: 0,
    })
    price!: number;

    @ApiProperty({
        example: "Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style. Made from 100% Peruvian cotton and featuring the Tesla wordmark across the chest, the exclusive tee will commemorate your order for years to come.",
        description: 'Product Description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description!: string;

    @ApiProperty({
        example: "men_haha_yes_tee",
        description: 'Product Slug',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true
    })
    slug!: string;

    @ApiProperty({
        example: 10,
        description: 'Product Stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock!: number;

    @ApiProperty({
        example: [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL"
        ],
        description: 'Product Sizes',
    })
    @Column('text', {
        array: true
    })
    sizes!: string[]

    @ApiProperty({
        example: ["men"],
        description: 'Product Gender',
    })
    @Column('text')
    gender!: string;
    
    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags!: string[]

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[]

    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true}
    )
    user!: User

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }

        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(" ","_")
            .replaceAll("'","")
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(" ","_")
            .replaceAll("'","")
    }
}
