import { 
        Entity, 
        Column,
        PrimaryColumn,
        ManyToOne,
        JoinColumn,
        BaseEntity,
} from "typeorm"
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@Entity()
export class IngredientsInRecipe extends BaseEntity{

    @PrimaryColumn({name: "ingredientName"})
    ingredientName: string;

    @PrimaryColumn({name: "recipeTitle"})
    recipeTitle: string;

    @Column("float")
    amount: number

    @Column()
    unit: string
    
    @ManyToOne(() => Recipe, recipe => recipe.ingredientInRecipes, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "recipeTitle", referencedColumnName: "title"}])
    recipe: Recipe;

    @ManyToOne(type=> Ingredient, ingredient => ingredient.ingredientsInRecipe, {
        nullable: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn([{name: "ingredientName", referencedColumnName: "name"}])
    ingredient: Ingredient;
}
