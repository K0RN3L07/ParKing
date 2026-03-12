export async function loadMainTabFunctions() {
    try {
        const bookingsPerDay = await window.api.getBookingsPerDay();
        const peakParkingHours = await window.api.getPeakParkingHours();
        const mostUsedParkingSpaces = await window.api.getMostUsedParkingSpaces();
        const revenueOverTime = await window.api.getRevenueOverTime();
        const bookingsByStatus = await window.api.getBookingsByStatus();

        // const userCount = await window.api.getUserCount();
        const activeBookingCount = await window.api.getActiveBookingCount();
        // const allBookingPrices = await window.api.getAllBookingPrices();
        const todaysRevenue = await window.api.getTodaysRevenue();
        const averageBookingTime = await window.api.getAverageBookingTime();

        const carousel = document.querySelector('#statsCarousel');
        const cyclingCarausel = new bootstrap.Carousel(carousel, {
            interval: 5000,  // cycle every 3 seconds
            ride: 'carousel' // start automatically
        });

        carousel.addEventListener('slid.bs.carousel', function (e) {
            const chartId = e.relatedTarget.querySelector("canvas")?.id;
            if (chartId) {
                const chart = Chart.getChart(chartId);
                chart?.resize();
            }
        });

        // #region Bookings Per Day (line)
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
                        max: 12
                    }
                }
            },
            ticks: {
                autoSkip: false
            }
        });
        //#endregion

        // #region Peak Hours (bar)
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
        //#endregion

        // #region Most Used Spaces (bar)
        let parkingSlotArray = [];
        let parkingCountArray = [];
        mostUsedParkingSpaces.forEach(stat => {
            parkingSlotArray.push(stat.parking_slot);
            parkingCountArray.push(stat.usage_count);
        });
        new Chart(document.getElementById("chartSpaces"), {
            type: "bar",
            data: {
                labels: parkingSlotArray,
                datasets: [{
                    label: "Alkalom",
                    data: parkingCountArray,
                    backgroundColor: "#ffc107"
                }]
            }
        });
        //#endregion

        // #region Revenue (line)
        let dayArray2 = [];
        let revenueArray = [];
        revenueOverTime.forEach(stat => {
            const date = new Date(stat.day);
            const date_formatted = date.toLocaleString("hu-HU", {
                year: "numeric", month: "2-digit", day: "2-digit"
            });
            dayArray2.push(date_formatted);
            revenueArray.push(stat.revenue);
        });
        new Chart(document.getElementById("chartRevenue"), {
            type: "line",
            data: {
                labels: dayArray2,
                datasets: [{
                    label: "Bevétel (Ft)",
                    data: revenueArray,
                    borderColor: "#dc3545"
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
                    }
                }
            },
            ticks: {
                autoSkip: false
            }
        });
        //#endregion

        // #region Booking Status
        let statusArray = [];
        let statusCountArray = [];
        bookingsByStatus.forEach(stat => {
            statusArray.push(stat.parking_status);
            statusCountArray.push(stat.count);
        });
        new Chart(document.getElementById("chartStatus"), {
            type: "pie",
            data: {
                labels: statusArray,
                datasets: [{
                    data: statusCountArray,
                    backgroundColor: ["#198754", "#0d6efd", "#dc3545"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // important for resizing
                plugins: {
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value, context) => {
                            let sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            let percentage = (value / sum * 100).toFixed(1) + '%';
                            return percentage;
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // enable the datalabels plugin
        });
        //#endregion
    
        //#region Occupancy Percentage
        const percentageText = document.getElementById("percentageText");
        const occopancyProgressBar = document.getElementById("occopancyProgressBar");
        const occupiedCount = document.getElementById("occupiedCount");
        const freeCount = document.getElementById("freeCount");

        const maxParkingSpots = 100;
        const occupiedPercentage = Math.floor((parseInt(activeBookingCount[0].db) / maxParkingSpots) * 100);

        percentageText.innerHTML = `${occupiedPercentage}%`;

        occopancyProgressBar.style.width = percentageText.innerHTML;
        occopancyProgressBar.setAttribute("aria-valuenow", occupiedPercentage);

        occupiedCount.innerHTML = `${activeBookingCount[0].db} hely foglalt`;
        freeCount.innerHTML = `${maxParkingSpots - activeBookingCount[0].db} hely szabad`;
        //#endregion

        const todayRevenue = document.getElementById("todayRevenue");
        todayRevenue.innerHTML = `${new Intl.NumberFormat().format(todaysRevenue[0].revenue)} Ft`;

        const averageBookingTimeText = document.getElementById("averageBookingTime");
        averageBookingTimeText.innerHTML = `${Math.floor(averageBookingTime[0].avg_time / 24)} nap ${Math.floor(averageBookingTime[0].avg_time % 24)} óra`;

    } catch (err) {
        console.log("Error getting mainTab functions: ", err)
    }
}

