import { Beef, Beer, Candy, ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react"

interface iAppProps{
    name: string;
    title: string;
    image: ReactNode;
    id: number;
}

export const categoryItems: iAppProps[] = [
    {
        id: 0,
        name: "template",
        title: "Template",
        image:  <Globe />
    },
    {
        id: 1,
        name: "uikit",
        title: "Ui Kit",
        image: <ChefHat />,
    },
    {
        id: 2,
        name: "icon",
        title: "Icon",
        image: <PartyPopper /> ,
    },
    {
        id: 3,
        name: "meat",
        title: "Meat",
        image: <Beef />,
    },
    {
        id:4,
        name: "drinks",
        title: "Drinks",
        image: <Beer />,
    },
]