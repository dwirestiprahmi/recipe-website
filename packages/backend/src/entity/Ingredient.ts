import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    BaseEntity,
} from "typeorm"
import { IngredientsInRecipe } from "./IngredientsInRecipe"

@Entity()
export class Ingredient extends BaseEntity{

    @PrimaryColumn({unique:true})
    name: string

    @Column("text")
    description: string

    @Column()
    pictureLink: string

    @OneToMany(type => IngredientsInRecipe, ingredientsInRecipe =>ingredientsInRecipe.ingredient)
    ingredientsInRecipe: IngredientsInRecipe[]
}