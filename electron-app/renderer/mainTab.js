export async function loadMainTabFunctions() {
    try {
        // const userCount = await window.api.getUserCount();
        // const bookingCount = await window.api.getBookingCount();
        // const allBookingPrices = await window.api.getAllBookingPrices();

        const bookingsPerDay = await window.api.getBookingsPerDay();
        const peakParkingHours = await window.api.getPeakParkingHours();
        // const mostUsedParkingSpaces = await window.api.getMostUsedParkingSpaces();
        // const revenueOverTime = await window.api.getgetRevenueOverTime();
        // const bookingsByStatus = await window.api.getgetBookingsByStatus();

        const carousel = document.querySelector('#statsCarousel');

        carousel.addEventListener('slid.bs.carousel', function (e) {
            const chartId = e.relatedTarget.querySelector("canvas")?.id;
            if (chartId) {
                const chart = Chart.getChart(chartId);
                chart?.resize();
            }
        });

        // Bookings per Day (line)
        let dayArray = [];
        let bookingCountArray = [];
        bookingsPerDay.forEach(stat => {
            const date = new Date(stat.day);
            const date_formatted = date.toLocaleString("hu-HU", {
                year: "numeric", month: "2-digit", day: "2-digit"
            });
            dayArray.push(date_formatted);
            bookingCountArray.push(stat.booking_count);
        });
        new Chart(document.getElementById("chartBookingsPerDay"), {
            type: "line",
            data: {
                labels: dayArray,
                datasets: [{
                    label: "Foglalás",
                    data: bookingCountArray,
                    borderColor: "#0d6efd",
                    tension: 0.3
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            callback: function (value) {
                                const label = this.getLabelForValue(value);
                                const day = new Date(label).getDate();
                                return day % 2 === 1 ? label : '';
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            },
            ticks: {
                autoSkip: false
            }
        });

        // Peak Hours (bar)
        let hoursArray = [];
        let hourCountArray = [];
        peakParkingHours.forEach(stat => {
            hoursArray.push(stat.hour);
            hourCountArray.push(stat.hour_count);
        });
        new Chart(document.getElementById("chartPeakHours"), {
            type: "bar",
            data: {
                labels: hoursArray,
                datasets: [{
                    label: "Foglalás",
                    data: hourCountArray,
                    backgroundColor: "#198754"
                }]
            }
        });

        // Most Used Spaces
        new Chart(document.getElementById("chartSpaces"), {
            type: "bar",
            data: {
                labels: ["12", "25", "33", "41", "18"],
                datasets: [{
                    label: "Usage",
                    data: [20, 18, 15, 13, 10],
                    backgroundColor: "#ffc107"
                }]
            }
        });

        // Revenue
        new Chart(document.getElementById("chartRevenue"), {
            type: "line",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                datasets: [{
                    label: "Revenue",
                    data: [2000, 3400, 2700, 4200, 3100],
                    borderColor: "#dc3545"
                }]
            }
        });

        // Booking Status
        new Chart(document.getElementById("chartStatus"), {
            type: "pie",
            data: {
                labels: ["Aktív", "Lejárt", "Későbbi"],
                datasets: [{
                    data: [10, 25, 15],
                    backgroundColor: ["#198754", "#dc3545", "#0d6efd"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false // <-- important for resizing
            }
        });
    } catch (err) {
        console.log("Error getting mainTab functions: ", err)
    }
}