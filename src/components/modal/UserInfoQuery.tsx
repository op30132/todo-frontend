import React, { useState } from "react";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import useDebounce from "../../hook/UseDebounce";
import { queryUserByEmail } from "../../service/userService";
import { UserProfile } from "../../shared/model";

interface IProps {
  onSelect: (userId: string) => void,
  isSelected: boolean;
  setSelected: (val: boolean) => void;
}

const UserInfoQuery: React.FC<IProps> = ({onSelect, isSelected, setSelected}) => {
  const [debouncedValue, queryString ,setValue] = useDebounce<string>("", 1000);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const onKeyChange = (query: string) => {
    setSelected(false);
    setValue(query);
  };
  useEffect(() => {
    if(!debouncedValue) return;
    queryUserByEmail(debouncedValue).then(res => setUsers(res));
  }, [debouncedValue]);

  const selectUser = (userId: string) => {
    setSelected(true);
    onSelect(userId);
  };
  return (
    <div className="flex flex-col">
      <input name="email" autoFocus type="email" placeholder="Keyword" value={queryString} onChange={e => onKeyChange((e.target as HTMLInputElement).value)} />
      <div className="border border-beige-darker shadow-md rounded-md p-2 mt-1" hidden={!queryString || isSelected}>
        {!!queryString && queryString!==debouncedValue && <CgSpinner className="animate-spin" size={20}/>}
        {!!queryString && queryString===debouncedValue && (
          users.length===0 ? <div>No result</div> : users.map(el => (
            <div key={el.id} className="hover:bg-beige p-1 rounded-sm cursor-pointer text-purple font-bold" onClick={() => selectUser(el.id)}>
              {el.username}
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default UserInfoQuery;