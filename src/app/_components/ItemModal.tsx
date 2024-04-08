"use client";

import { type ShoppingItem } from "@prisma/client";
import { type Dispatch, type FC, type SetStateAction } from "react";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}

const ItemModal: FC<ItemModalProps> = ({}) => {
  // const [input, setInput] = useState<string>("");
  return (
    <div className="absolute inset-0 flex justify-center bg-black/75">
      <div className="space-y-4 p-3">
        <h3 className="text-xl font-medium">Name of Item</h3>
        <input type="text" />
        <div className="flex justify-end">
          <button type="button">Cancel</button>
          <button type="button">Add</button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
