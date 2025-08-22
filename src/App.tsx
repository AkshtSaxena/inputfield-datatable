import React, { useState, useEffect } from "react";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

type Person = { id: number; name: string; age: number };

const sampleData: Person[] = [
  { id: 1, name: "Akshat", age: 24 },
  { id: 2, name: "Riya", age: 27 },
  { id: 3, name: "Sana", age: 22 },
];

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  // simulate API loading (2 sec)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFilteredData(sampleData);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // filter whenever query changes
  useEffect(() => {
    if (!query) {
      setFilteredData(sampleData);
    } else {
      setFilteredData(
        sampleData.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Components Demo</h2>

      {/* Search Input */}
      <section className="space-y-2">
        <InputField
          label="Search by name"
          placeholder="Type a name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          helperText="Try: Akshat, Riya, Sana"
          clearable
          variant="outlined"
        />
      </section>

      {/* Data Table */}
      <section className="space-y-2">
        <h3 className="text-lg font-medium">People</h3>
        <DataTable<Person>
          data={filteredData}
          loading={loading}
          selectable
          columns={[
            { key: "id", title: "ID", dataIndex: "id", sortable: true },
            { key: "name", title: "Name", dataIndex: "name", sortable: true },
            { key: "age", title: "Age", dataIndex: "age", sortable: true },
          ]}
          onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
      </section>
    </div>
  );
};

export default App;
