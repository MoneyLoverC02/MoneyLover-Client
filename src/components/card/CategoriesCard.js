import { Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CategoriesCard() {
    const allCategory = useSelector(state => state.transaction.allCategory);
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        let subTypeArr = [];
        let categoryListBySubType = [];
        allCategory?.forEach(category => {
            let index = subTypeArr.indexOf(category.subType);
            if (index === -1) {
                subTypeArr.push(category.subType)
            }
        });

        subTypeArr.forEach(item => {
            let data = allCategory.filter(category => category.subType === item);
            categoryListBySubType.push({ subType: item, data })
        })
        setDataCategory(categoryListBySubType);
    }, [allCategory])

    return (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <div className='px-4 my-8'>
                <div className='flex justify-center gap-4'>
                    <div className="min-w-[350px] md:w-[550px] min-h-[70px] bg-white rounded shadow-lg overflow-hidden">
                        <div className="">
                            {dataCategory?.length > 0 && dataCategory.map(item => (
                                <div id="type-category">
                                    <div className=" bg-zinc-100 py-2 px-4">
                                        <span className="text-sm text-graynew">{item?.subType}</span>
                                    </div>
                                    {item.data.length > 0 && item.data.map(category => (
                                        <div>
                                            <div className="px-4 py-2 border-t flex justify-start items-center gap-4 cursor-pointer hover:bg-lightlime">
                                                <img className="w-10 h-10 object-cover" src={category.icon} alt="" />
                                                <span className="text-textcolor">
                                                {category.name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    )
}