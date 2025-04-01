import sample_Data from "./Sample_Data"; // Sample Data which would be fetch from Backend API
import { PieChart, Pie, Tooltip, Cell } from "recharts"; // React module to display data
import "./Grid_Energy.css";

const Grid_Energy = () => {
  //Reformat sample data to incorporate ratings
  const not_Green = ["CCGT", "COAL", "OCGT", "OIL"];
  const green = ["BIOMASS", "NPSHYD", "NUCLEAR", "PS", "Wind"];

  const formatted_Data = sample_Data.data.map((energy) => {
    if (not_Green.includes(energy.fuelType)) {
      return { ...energy, Rating: "Not Green" };
    } else if (green.includes(energy.fuelType)) {
      return { ...energy, Rating: "Green" };
    } else {
      return { ...energy, Rating: "Neutral" };
    }
  });

  //
  function total_Generation_By_Rating(data) {
    const summarised_Data = data.reduce((acc, entry) => {
      if (!acc[entry.Rating]) {
        acc[entry.Rating] = 0;
      }
      acc[entry.Rating] += entry.generation;
      return acc;
    }, {}); // Provide an empty object as the initial value

    return Object.entries(summarised_Data).map(([key, value]) => ({
      // Format data in correct format for pie chart
      name: key,
      value,
    }));
  }

  // Define colours by rating
  const colours = {
    Green: "#00C49F",
    "Not Green": "#FF8042",
    Neutral: "#0088FE",
  };

  return (
    <div className="container">
      <h2 className="heading">Grid Energy Summary</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={total_Generation_By_Rating(formatted_Data)}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name} - ${value}`}
        >
          {total_Generation_By_Rating(formatted_Data).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colours[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Grid_Energy;
