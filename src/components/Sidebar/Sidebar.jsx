import { useState, useEffect } from "react";

function Sidebar({ setFilteredAttributes }) {
  const [selectedTraitType, setSelectedTraitType] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [traitTypes, setTraitTypes] = useState([]);

  useEffect(() => {
    fetch("json/metadata_rank_Thesyncers.json")
      .then((response) => response.json())
      .then((data) => {
        setAttributes(data.attributes);
        const types = [...new Set(data.attributes.map((attr) => attr.trait_type))];
        setTraitTypes(types);
        setFilteredAttributes(data.attributes);
      })
      .catch((error) => console.log(error));
  }, [setFilteredAttributes]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTraitType(selectedValue);

    if (selectedValue === "") {
      setFilteredAttributes(attributes);
    } else {
      const filtered = attributes.filter(
        (attribute) => attribute.trait_type === selectedValue
      );
      setFilteredAttributes(filtered);
    }
  };

  return (
    <div>
      <h2>Filter by Trait Type:</h2>
      <select value={selectedTraitType} onChange={handleSelectChange}>
        <option value="">All</option>
        {traitTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sidebar;
