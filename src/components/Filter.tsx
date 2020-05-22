import * as React from 'react';

interface FilterProps {
    filter: (name: string, addres: string) => void;
}

export const Filter = ({ filter }: FilterProps) => {
    const [nameFilter, setNameFilter] = React.useState<string>("");
    const [addressFilter, setAddressFilter] = React.useState<string>("");

    const onCleanFilter = () => {
        setNameFilter("");
        setAddressFilter("");
        filter("", "");
    }

    return (
        <div>
            <h4>Name</h4>
            <input value={nameFilter} onChange={(ev: any) => setNameFilter(ev.target.value)} />
            <h4>Address</h4>
            <input value={addressFilter} onChange={(ev: any) => setAddressFilter(ev.target.value)} />
            <button onClick={() => filter(nameFilter, addressFilter)}>Filter</button>
            <button onClick={onCleanFilter}>Clean</button>
        </div>
    );
}