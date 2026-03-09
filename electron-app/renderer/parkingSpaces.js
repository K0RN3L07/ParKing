export async function loadAllParkingSpaces() {
    const parkingSpaces = await window.api.getAllParkingSpaces();
    const table = document.getElementById("parkingSpacesTable");
    table.innerHTML = "";

    parkingSpaces.forEach(parkingSpace => {
        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${parkingSpace.id}</td>
                <td>${parkingSpace.floor_num}</td>
                <td>${parkingSpace.parking_space_num}</td>
                <td>${parkingSpace.type}</td>
                <td>${parkingSpace.price_per_hour}</td>
            `;
            
        table.appendChild(row);
    });
}