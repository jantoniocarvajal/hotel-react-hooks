import * as React from 'react';
import "../styles.scss";

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
        <div className="container">
            <div className="row">
                <label>Name</label>
                <input value={nameFilter} onChange={(ev: any) => setNameFilter(ev.target.value)} />
            </div>
            <div className="row">
                <label>Address</label>
                <input value={addressFilter} onChange={(ev: any) => setAddressFilter(ev.target.value)} />
            </div>
            <div className="row">
                <button onClick={() => filter(nameFilter, addressFilter)}>Filter</button>
                <button onClick={onCleanFilter}>Clean</button>
            </div>
        </div>
    );
}