import { 
        Entity, 
        PrimaryGeneratedColumn, 
        Column,
        ManyToMany,
        JoinTable,
        PrimaryColumn,
        OneToMany,
        BaseEntity,
} from "typeorm"
import { Ingredient } from "./Ingredient";
import { IngredientsInRecipe } from "./IngredientsInRecipe";

@Entity()
export class Recipe extends BaseEntity{

    @PrimaryColumn({unique: true})
    title: string;

    @Column("text")
    description: string;

    @Column()
    pictureLink: string;

    @Column("text")
    steps: string;

    @Column({
        type: "int",
        default: 0,
    })
    rating: number;

    @OneToMany(type => IngredientsInRecipe, ingredientsInRecipe => ingredientsInRecipe.recipe)
    ingredientInRecipes: Ingredient[]
}
