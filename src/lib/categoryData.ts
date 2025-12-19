import { ReactNode } from "react";
import {
    TbBallFootball,
    TbBook,
    TbCar,
    TbDog,
    TbDeviceLaptop,
    TbHome,
    TbPerfume,
    TbDeviceGamepad2,
    TbHeartRateMonitor,
    TbShoppingCart,
    TbDiamond,
    TbMoodKid,
    TbPaperclip,
    TbShirt,
    TbCategory
} from "react-icons/tb";

export const categoryIcons: { [key: string]: React.ElementType } = {
    'Sports & Outdoors': TbBallFootball,
    'Books & Stationery': TbBook,
    'Automotive': TbCar,
    'Pet Supplies': TbDog,
    'Electronics': TbDeviceLaptop,
    'Home & Kitchen': TbHome,
    'Beauty & Personal Care': TbPerfume,
    'Toys & Games': TbDeviceGamepad2,
    'Health & Wellness': TbHeartRateMonitor,
    'Groceries': TbShoppingCart,
    'Jewelry & Accessories': TbDiamond,
    'Baby & Kids': TbMoodKid,
    'Office Supplies': TbPaperclip,
    'Fashion': TbShirt,
};

export const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || TbCategory;
};

export const categoriesList = Object.keys(categoryIcons);
